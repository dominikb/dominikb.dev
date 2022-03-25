---
title: 'Autoloading entities in Spring Shell commands'
tags: ["java", "spring", "spring-boot"]
published: true
date: '2022-03-25'
---

 During an assignment for my lecture _Software-Development using Enterprise Technologies_ we had to develop an auctioning system using Spring Boot. The interaction with this system had to be possible with a CLI developed using [Spring Shell](https://spring.io/projects/spring-shell).

 The command we will look at in this post is the command __bid__ which allows to place a on an article for a given user. The interface will look roughly like this:

```shell
 place-bid --article 10 --buyer 5 --price 124 EUR
```

## Starting out

The method signature I started with was using simple, primitive objects as arguments which Spring could automatically parse from the user input.

```java
@ShellMethod(value = "Place a bid on an article for a given customer", key = "place-bid")
public String bid(@ShellOption Long articleId,
                  @ShellOption Long customerId,
                  @ShellOption(arity = 2) List<String> price) {
```

This left a lot to be desired. First, I want the price to use my abstraction `CurrencyAmount` which combines a numeric value with a unit [^1]. This was something I needed multiple times for other commands as well and having the conversion logic repeated for multiple commands seemed like a bad move.

So I looked up how Spring Shell converts user input to method arguments. It turns out converting is done by having a `Converter<Source, Target>` component registered - _who could've thought_. As I had already some helper methods in place to convert a string into a `CurrencyAmount` this was straightforward:

```java
@Component
public class CurrencyAmountConverter implements Converter<String, CurrencyAmount> {
    @Override
    public CurrencyAmount convert(String source) {
        String[] parts = source.split(" ");

        return CurrencyAmount.of(
                Long.parseLong(parts[0]),
                Currency.fromString(parts[1])
        );
    }
}
```

Et voilà - now we have improved our command signature significantly already.
```java
@ShellMethod(value = "Place a bid on an article for a given customer", key = "place-bid")
public String bid(@ShellOption Long articleId,
                  @ShellOption Long customerId,
                  @ShellOption CurrencyAmount price) {
```

## Continuing this thought

Now I was wondering if it was possible to even extract loading of entities.

It turns out this works just the same: Implementing a converter `Converter<String, Customer>` simply worked.

```java
@Component
public class CustomerLoader implements Converter<String, Customer> {
    
    @Autowired private CustomerService customerService;
    
    @Override
    public Customer convert(String source) {
        return customerService.find(Long.parseLong(source))
                .orElseThrow(() -> new EntityNotFoundException(
                        "Could not find customer for id '"  + source + "'."
                ));
    }
}
```

After implementing converters for all my entities my problem was solved and it resulted in a nice looking interface for implementing shell commands. Or so it seemed at first...

```java
@ShellMethod(value = "Place a bid on an article for a given customer", key = "place-bid")
public String bid(@ShellOption Article article,
                  @ShellOption Customer customer,
                  @ShellOption CurrencyAmount price) {
```

## Troubles in paradise

As it turns out problems with lazy-loading arised when trying to access related entities. My first thought was to slap a `@Transactional()` annotation onto the command method but this did not resolve the lazy-loading errors.

The reason for this was that entities loaded by a converter were not attached to an `EntityManager` and thus the relation proxy could not execute the lazy-loading query.

## AOP to the rescue

Out of curiosity and because I was already down this rabbit-hole too far, I tried to also resolve this issue using a custom `Aspect`. For every `Entity` loaded and injected as an argument, I need to call `merge()` on an open `EntityManger`.

This was my solution:

```java
@Aspect @Component
public class AutoloadedEntityAttacherAspect {

    @PersistenceContext
    private EntityManager entityManager;

    @Around("shellCommands() && within(io.dominikb.homework3.commands.*)")
    public Object attachObjectsToEntityManager(ProceedingJoinPoint pjp) throws Throwable {
        var args = pjp.getArgs();
        for (int i = 0; i < args.length; i++) {
            if (args[i].getClass().isAnnotationPresent(Entity.class))
                args[i] = entityManager.merge(args[i]);
        }
        return pjp.proceed(args);
    }

    @Pointcut("@annotation(org.springframework.shell.standard.ShellMethod)")
    public void shellCommands(){}
}
```

With having flexed my newly acquired knowledge about aspect-oriented programming I was satisfied with my solution and called it a day.

[^1]: For simplicity's sake and because floating point arithmetic is hard, my currency abstraction does not allow for cents.
    ```java
    public class CurrencyAmount{
        private long amount;
        private Currency unit;
    }

    public enum Currency {
        EURO("€"), USD("$");

        private final String representation;

        Currency(String representation) {
            this.representation = representation;
        }

        public static Currency fromString(String currency) {
            return switch (currency) {
                case "EUR", "€" -> Currency.EURO;
                case "USD", "$" -> Currency.USD;
                default -> throw new IllegalArgumentException("No currency available for given string");
            };
        }
    }
    ```
