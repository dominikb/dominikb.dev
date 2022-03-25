---
title: 'About generated methods for has_many relations'
tags: ["rails", "ruby",]
published: true
date: '2022-03-04'
---

```ruby
class Post
end

class Author < ApplicationRecord
	has_many :posts
end
```

Besides making the collection of objects available through `author.posts` 16 more methods get [added to the model automatically](https://guides.rubyonrails.org/association_basics.html#has-many-association-reference).

```ruby
# Even when you add a post_ids column to the author model, the value is never persisted ;)
# Only foreign_keys on related models get updated accordingly!
author.post_ids == author.posts.map(&:id)
```
