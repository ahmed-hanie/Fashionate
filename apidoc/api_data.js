define({ "api": [
  {
    "type": "post",
    "url": "/category/",
    "title": "Create category",
    "name": "CreateCategory",
    "group": "Category",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Category id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Category name</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/category.js",
    "groupTitle": "Category"
  },
  {
    "type": "delete",
    "url": "/category/:id",
    "title": "Delete category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of category</p>"
          }
        ]
      }
    },
    "name": "DeleteCategory",
    "group": "Category",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "version": "0.0.0",
    "filename": "../fashionate/routes/category.js",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/category",
    "title": "Request categories",
    "name": "GetCategories",
    "group": "Category",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of categories</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/category.js",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/category/:id",
    "title": "Request category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of category</p>"
          }
        ]
      }
    },
    "name": "GetCategory",
    "group": "Category",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Category id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Category name</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/category.js",
    "groupTitle": "Category"
  },
  {
    "type": "put",
    "url": "/category/:id",
    "title": "Update category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of category</p>"
          }
        ]
      }
    },
    "name": "UpdateCategory",
    "group": "Category",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Category id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Category name</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/category.js",
    "groupTitle": "Category"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "../fashionate/apidoc/main.js",
    "group": "D:\\Programming\\CoDe\\JS\\fashionate\\apidoc\\main.js",
    "groupTitle": "D:\\Programming\\CoDe\\JS\\fashionate\\apidoc\\main.js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/order/user",
    "title": "Request orders for user",
    "name": "GetOrder",
    "group": "Order",
    "permission": [
      {
        "name": "user"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of orders</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "post",
    "url": "/order",
    "title": "Create Order",
    "name": "PostOrder",
    "group": "Order",
    "permission": [
      {
        "name": "user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "products",
            "description": "<p>List of products with quantities</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>Order uuid</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "products",
            "description": "<p>List of products in order with quantities</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "delete",
    "url": "/product/:uuid",
    "title": "Delete product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>Unique identifier of product</p>"
          }
        ]
      }
    },
    "name": "DeleteProduct",
    "group": "Product",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "version": "0.0.0",
    "filename": "../fashionate/routes/product.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/product/:uuid",
    "title": "Request product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>Unique identifier of product</p>"
          }
        ]
      }
    },
    "name": "GetProduct",
    "group": "Product",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>Product uuid</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Product description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Product name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Product price</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>Product category identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "subcategories",
            "description": "<p>Product subcategories</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "tags",
            "description": "<p>Product tags</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/product.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/product",
    "title": "Request products",
    "name": "GetProducts",
    "group": "Product",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of products</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/product.js",
    "groupTitle": "Product"
  },
  {
    "type": "post",
    "url": "/product",
    "title": "Create product",
    "name": "PostProduct",
    "group": "Product",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>Product uuid</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Product description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Product name</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Product price</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>Product category identifier</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "subcategories",
            "description": "<p>Product subcategories</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "tags",
            "description": "<p>Product tags</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>Product uuid</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Product description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Product name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Product price</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>Product category identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "subcategories",
            "description": "<p>Product subcategories</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "tags",
            "description": "<p>Product tags</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/product.js",
    "groupTitle": "Product"
  },
  {
    "type": "put",
    "url": "/product/:uuid",
    "title": "Update product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>Unique identifier of product</p>"
          }
        ]
      }
    },
    "name": "UpdateProduct",
    "group": "Product",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>Product uuid</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Product description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Product name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Product price</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>Product category identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "subcategories",
            "description": "<p>Product subcategories</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "tags",
            "description": "<p>Product tags</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/product.js",
    "groupTitle": "Product"
  },
  {
    "type": "post",
    "url": "/subcategory/",
    "title": "Create subcategory",
    "name": "CreateSubcategory",
    "group": "Subcategory",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Subcategory id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Subcategory name</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/subcategory.js",
    "groupTitle": "Subcategory"
  },
  {
    "type": "delete",
    "url": "/subcategory/:id",
    "title": "Delete subcategory",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of subcategory</p>"
          }
        ]
      }
    },
    "name": "DeleteSubcategory",
    "group": "Subcategory",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "version": "0.0.0",
    "filename": "../fashionate/routes/subcategory.js",
    "groupTitle": "Subcategory"
  },
  {
    "type": "get",
    "url": "/subcategory",
    "title": "Request subcategories",
    "name": "GetSubcategories",
    "group": "Subcategory",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of subcategories</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/subcategory.js",
    "groupTitle": "Subcategory"
  },
  {
    "type": "get",
    "url": "/subcategory/:id",
    "title": "Request subcategory",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of subcategory</p>"
          }
        ]
      }
    },
    "name": "GetSubcategory",
    "group": "Subcategory",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Subcategory id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Subcategory name</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/subcategory.js",
    "groupTitle": "Subcategory"
  },
  {
    "type": "put",
    "url": "/subcategory/:id",
    "title": "Update subcategory",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of subcategory</p>"
          }
        ]
      }
    },
    "name": "UpdateSubcategory",
    "group": "Subcategory",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Subcategory id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Subcategory name</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/subcategory.js",
    "groupTitle": "Subcategory"
  },
  {
    "type": "post",
    "url": "/tag/",
    "title": "Create tag",
    "name": "CreateTag",
    "group": "Tag",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Tag id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Tag name</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/tag.js",
    "groupTitle": "Tag"
  },
  {
    "type": "delete",
    "url": "/tag/:id",
    "title": "Delete tag",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of tag</p>"
          }
        ]
      }
    },
    "name": "DeleteTag",
    "group": "Tag",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "version": "0.0.0",
    "filename": "../fashionate/routes/tag.js",
    "groupTitle": "Tag"
  },
  {
    "type": "get",
    "url": "/tag/:id",
    "title": "Request tag",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of tag</p>"
          }
        ]
      }
    },
    "name": "GetTag",
    "group": "Tag",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Tag id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Tag name</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/tag.js",
    "groupTitle": "Tag"
  },
  {
    "type": "get",
    "url": "/tag",
    "title": "Request tags",
    "name": "GetTags",
    "group": "Tag",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of tags</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/tag.js",
    "groupTitle": "Tag"
  },
  {
    "type": "put",
    "url": "/tag/:id",
    "title": "Update tag",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of tag</p>"
          }
        ]
      }
    },
    "name": "UpdateTag",
    "group": "Tag",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Tag id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Tag name</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/tag.js",
    "groupTitle": "Tag"
  },
  {
    "type": "put",
    "url": "/user/:uuid/disable",
    "title": "Disable user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>Unique identifier of user</p>"
          }
        ]
      }
    },
    "name": "DisableUser",
    "group": "User",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success informational message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/:uuid",
    "title": "Request user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>Unique identifier of user</p>"
          }
        ]
      }
    },
    "name": "GetUser",
    "group": "User",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>User uuid</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user",
    "title": "Request users",
    "name": "GetUsers",
    "group": "User",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of users</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login user",
    "name": "LoginUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "AccessToken",
            "description": "<p>JWT token for authenticating user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "RefreshToken",
            "description": "<p>JWT token for refreshing access token before expiry</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "roles",
            "description": "<p>List of account roles</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/user",
    "title": "Logout user",
    "name": "LogoutUser",
    "group": "User",
    "permission": [
      {
        "name": "authenticated"
      }
    ],
    "version": "0.0.0",
    "filename": "../fashionate/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Refresh access token user",
    "name": "RefreshTokenUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Refresh token</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "authenticated"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "AccessToken",
            "description": "<p>New valid access token</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register admin user",
    "name": "RegisterAdminUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>User uuid</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register user",
    "name": "RegisterUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>User uuid</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../fashionate/routes/user.js",
    "groupTitle": "User"
  }
] });
