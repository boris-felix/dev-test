module.exports = {
  client: {
    service: {
      name: "localhost",
      localSchemaFile: "schema.graphql"
    },
    skipSSLValidation: true,
    excludes: ["node_modules/**/*"],
    includes: ["**/*.{ts,tsx}"]
  }
};