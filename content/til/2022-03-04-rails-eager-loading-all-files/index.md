---
title: 'How to eager load files with Rails'
tags: ["rails", "ruby",]
published: true
date: '2022-03-04'
---

Once, I wrote some code that read similar to this:

```ruby
module Stub
  class Applicable end

  class ImmediatelyApplicable < Applicable
  end

  class DelayedApplicable < Applicalbe
  end
end
```

As this were just stub-classes they were not used in any test. They pipeline succeeded and deployed the code to a staging environment. This resulted in an error and the service was down, albeit working perfectly on my machine! 


> __[2022-03-04T12:34:56+00.00 app[worker.1]: pid=1 tid=2ks]__ WARN: NameError: uninitialized constant Stub::Applicalbe


Turns out, I made a typo and wrote _Applica**lb**e_. \*facepalm\*

When in development mode, files are only required when they are needed the first time but when running `Rails` in production mode, it was eager loading all the files.

Turns out, you can reproduce this locally in your console to re-create the error:

```sh
$ bin/rails console
irb(main):001:0> Rails.application.eager_load!
```