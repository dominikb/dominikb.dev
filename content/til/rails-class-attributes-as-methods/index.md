---
title: 'Ruby class members are methods!'
tags: ["ruby"]
published: true
date: '2022-03-04'
---

Members of a class are retrieved via sending message to the instance object. This means, accessing a property is the same as invoking a method with the same name.

This can be used as a useful shorthand in combination with the _method reference operator_.

```ruby
class Person
  attr_accessor :name
  def initialize(name)
    @name = name
  end
end

author = Person.new("dominik")

# Accessing properties using a dynamic invokation
author.name == author.send(:name)
=> true

# Mapping over a list of objects to extract one property
people = [Person.new("Dominik"), Person.new("Albert"), Person.new("Frieda")]

people.map { |person| person.name } # or
people.map(&:name)
=> ["Dominik", "Albert", "Frieda"]
```