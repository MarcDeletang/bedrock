## Server lifecycle

Bedrock est un singleton. Initialisé via la méthode init.  
Une variable d'environnement NODE_ENV doit être définie afin que le serveur se lance.  


`Init:
charge la configuration
charge hapi et remplace le mockLogger par le logger de hapi
décore hapi avec les méthodes custom
chargement des services (promesse)
chargement des models (promesse)
chargement des registers (promesse)
chargement des routes (promesse)
`

`Shapes:
decorations: [{ target: string, name: string, method: func }]
services/models: [{init: func}]
registers:[func, func]
routes: {
  test: {
    truc: {
      configHapi,
    },
    machin: {
      configHapi,
    }
    configHapi,
  }
}
`

Chacune des methodes d'init est appelée avec Bedrock en paramètre.

## Models

> MongooseWrapper / PostgresWrapper  
> Wrappers d'initialisation pour mongoose et objection, configurations chargées:  
> Bedrock.config.mongo  
> Bedrock.config.postgres


## Rules

Le code doit être testé  
Les dépendances doivent être installées avec la version exacte (yarn add -E)  
https://yarnpkg.com/en/docs/cli/add



## Structure:

> - _test__: Contient tous les tests
> - _build: Contient les fichiers javascript compilés, ainsi que les .map et .d.ts  
> - config: Contient le fichier de configuration de test  
> - deps: Expose certaines dépendances (hapi, mongoose, objection)
> - app: Contient le code typescript  
>  - /mocks: Contient les classes de tests / par défault  
>  - /server: Contient le serveur responsable du chargement des modules  
>  - /services: Contient différents services
