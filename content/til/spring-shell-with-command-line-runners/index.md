---
title: 'CommandLineRunners in Spring Shell'
tags: ["java", "spring", "spring-boot"]
published: true
date: '2022-03-25'
---

Spring Shell uses a `CommandLineRunner` blocking the main thread in order to run the interactive communication with the user.

Other `CommandLineRunners` without any defined `@Order()` or a lower priority will not be executed before entering the interactive shell. They are only executed once the Spring Shell is executed with the `exit` command.

In order to have runners run before the shell they need an `@Order()` lower than 0.

```java
@Component
@Order(-1) // Run before Spring Shell
public class DbSeedRunner implements CommandLineRunner
```

Source:
- https://docs.spring.io/spring-shell/docs/2.0.0.M2/api/org/springframework/shell/jline/DefaultShellApplicationRunner.html
- https://stackoverflow.com/questions/62732605/spring-shell-with-command-line-runner-interface
