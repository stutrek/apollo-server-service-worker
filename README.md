# apollo-server-service-worker

This puts Apollo Server inside a service worker. You can back it with IndexedDB, your API, whatever you need. This will let you use a DB sync protocol, such as [PC]ouchDB or Dexie.Syncable to keep a local database in sync while providing a GraphQL API to the windows.
