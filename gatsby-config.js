module.exports = {
  siteMetadata: {
    title: "pdf merger",
    siteUrl: "https://jasminesung.github.io"
  },
  pathPrefix: "/pdf-merger-ui",
  plugins: [
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "pdf-merger-app",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-offline",
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    // {
    //   resolve: "gatsby-source-filesystem",
    //   options: {
    //     name: "styles",
    //     path: "./src/styles/",
    //   },
    //   __key: "styles",
    // },
  ],
};
