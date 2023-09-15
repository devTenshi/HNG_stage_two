# Crud App Documentation

## Create Person

```bash
    (action)             (verb)    (URI)         (argument(s))                                                                                 (type of argument)    (response)
    create:              POST      - /api        fullName, email, phoneNumber and age(compulosry)                                              Body                  success
```

## Get Person

```bash
    (action)             (verb)    (URI)          (argument(s))                                                                                (type of argument)    (response)    
    read:                  GET      - /api/:id    id(compulsory, params arguemnt), fullName (optional, query argument)                         Params, Query         success
```

## Edit Person

```bash
    (action)             (verb)    (URI)          (argument(s))                                                                                (type of argument)    (response)
    update:              PUT      - /api/:id      id(compulosry, params arguemnt) fullName, email, phoneNumber and age(optional, body arguemnt) Params, Query        success
```

## Delete Person

```bash
    (action)             (verb)    (URI)          (argument(s))                                                                                (type of argument)    (response)
    delete:              DELETE     - /api/:id     id(compulosry, params arguemnt), fullName (optional, query argument)                         Params, Query          success
```
