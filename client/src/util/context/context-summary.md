# Summary

## Every context is created as some kind of a store. It calls a hook to initialize innerState and get access to the state methods.

---

### Auth Context

This context tracks whether user is authenticated by working with token and other user data.

---

### HTTP Context

This context calls Http hook and forwards it's values and methods down to child components.

---

### User Context

Currently the most big and complex context. Basically, it's the set of methods that describes certain API interactions
and it also is a store for a logged in user, that contains info about him. Of course all that is exposed to child components,
so that we can use all methods and info in the project easilly. This store is only being initialized when user logs in.

---
