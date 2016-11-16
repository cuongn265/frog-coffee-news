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
| /api/users | get | List all users | --- |
| /api/users/role: | get | List all users of specified role | /api/users/collaborator |
| /api/articles | get | List all articles | --- |
| /api/taglist | get | List all tags | --- |
| /api/apisource | get | List all API News Source | --- |
| /api/category | get | List all news category | --- |
| /api/articles/:category | get | List all articles in specified category | api/articles/technology |
| /api/figure/:articleid | get | List of figures in specified article | api/figure/1 |


---------------------------------------------------
###Authors###
**Le Quoc Thang** 

**Ngo Manh Cuong**
