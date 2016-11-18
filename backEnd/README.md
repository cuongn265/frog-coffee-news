# frog-coffee-news-server
**This is the Express Backend Server for frog-coffee-new App**

**Requirement:**
- Node JS
- MySQL Workbench Server

##Installation

1. Open MySQL Workbench and import database **newsdb** by running `./miscellaneous/newsDB.sql`.
2. Run `npm install` command inside project root folder.

###Available API references (still updating....)

| URI | RESTful Method | Description | Example |
| --- | --- | --- | --- |
| /api/all/users | get | List all users | --- |
| /api/role:/users | get | List all users of specified role | /api/collaborator/users |
| /api/all/articles | get | List all articles | --- |
| /api/:category/articles | get | List all articles in specified category | api/technology/articles |
| /api/taglist | get | List all tags | --- |
| /api/apisource | get | List all API News Source | --- |
| /api/categories | get | List all news category | --- |
| /api/figure/:articleid | get | List of figures in specified article | api/figure/1 |

---------------------------------------------------
###Authors###
**Le Quoc Thang** 

**Ngo Manh Cuong**
