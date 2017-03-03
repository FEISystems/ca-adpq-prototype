# ca-adpq-prototype

[![Build status](https://ci.appveyor.com/api/projects/status/y66ddywcfi3mpn21/branch/Dev?svg=true)](https://ci.appveyor.com/project/ryan-chadwick-fei/ca-adpq-prototype/branch/Dev)  **latest**

[![Build status](https://ci.appveyor.com/api/projects/status/y66ddywcfi3mpn21/branch/stable/web/b?svg=true)](https://ci.appveyor.com/project/ryan-chadwick-fei/ca-adpq-prototype/branch/stable/web/b)  **stable**

[![Build status](https://ci.appveyor.com/api/projects/status/y66ddywcfi3mpn21/branch/production/web/b?svg=true)](https://ci.appveyor.com/project/ryan-chadwick-fei/ca-adpq-prototype/branch/production/web/b)  

You can access the site [here](http://ca-adpq-prototype.eastus2.cloudapp.azure.com)

Information on how Development Operations were applied to this poject can be found in the [DevOps Readme.md](https://github.com/FEISystems/ca-adpq-prototype/blob/master/devops/DevOps%20Readme.md) and the [Docker Environment Builds.md](https://github.com/FEISystems/ca-adpq-prototype/blob/master/devops/Docker%20Environment%20Builds.md)

#   1. Narrative Description/Release Notes
FEi Systems (FEi), a leading Information Technology (IT) services and analysis organization, headquartered in Columbia, MD, is pleased to respond to the California Department of Technology (DoT), Request for Interest (RFI) Number CDT-ADPQ-0117: “Pre-Qualified Vendor Pool for Digital Services-Agile Development” for Prototype A. 

FEi has successfully implemented Agile software solution development for clients, including federal agencies, as well as over 32 state and county state projects. In California, five counties have adopted FEi solutions for Electronic Health Record (EHR) systems and standardized assessment tools. 
Most recently, FEi joined the qualified vendor pool for Agile Development Services for the Mississippi Department of Child Protection Services (CPS). Additionally, as a testament of organizational maturity, FEi has sustained Capability Maturity Model Integration (CMMI) Level 3 certification for the last five years and is ISO/IEC 20000-1:2011 certified.


##  1.1 Prototype A Public URL and User Names/Passwords
FEi’s completed Prototype A can be accessed at [http://ca-adpq-prototype.eastus2.cloudapp.azure.com/](http://ca-adpq-prototype.eastus2.cloudapp.azure.com/#/home). The user will be prompted to login and can use the following user names and passwords:

**Authorized Users:**

*   AuthorizedUser1/AuthorizedU$er1
*   AuthorizedUser2/AuthorizedU$er2
*   AuthorizedUser3/AuthorizedU$er3

**Administrative Users:**
*   Admin1/@dMin1
*   Admin2/@dMin2

##  1.2 Prototype A Release Notes
At its core, Prototype A is an application that allows state employees to shop for end-user computer products (e.g., hardware, software, and related services) from pre-established contracts with the State. 

There are two types of users for the site:

**User Role 1: Authorized User (User)**
*   Users are individuals authorized to purchase from vendors with pre-established pricing contracts with the State
*   Users visit the site to browse for items before adding them to their shopping cart
*   Users may identify multiple items to compare then add items to their shopping cart
*   Users may search or browse to add items into their shopping cart directly without comparing with other products
Users order selected products by checking out from their shopping cart

**User Role 2: Administrative User (Admin)**
*   Admins are employees of the state’s lead purchasing organizations (e.g., Department of General Services and the Department of Technology)
*   Admins publish information about the catalog of products available for purchase
*   Admins can upload information about individual products or perform a bulk upload of items through an inventory file 
*   Admins can edit or delete product catalog items
*   Admins view reports about the purchases 
*   Admins can download purchase information for analysis 

### 1.2.1   Home Page
The Home Page was designed so that users can easily browse for products across three categories: Hardware, Software, and Services. We grouped items so that each menu displays products from the corresponding category in the dataset provided in the Prototype A resources file.  
After logging in, users can browse each category to select products. Alternatively, users can perform a general keyword search to find the desired product.  The Home Page also features an Advanced Search feature, where users can enter more granular search parameters, such as:

*   Product Name
*   Category
*   Price 
*   Manufacturer
*   Manufacturer Part Number
*   SKU #

The Home Page also includes space to highlight “Featured Products.” We anticipate this portion of the site could contribute to improved efficiency in the acquisition process by streamlining the products that are displayed for the users and expediting the shopping process.

### 1.2.2   Comparing Products
Users can add up to four items to a Compare List by selecting the “Compare” box found in each item. 

![Narrative Compare 1](./artifacts/Images/Narrative_Compare1.png?raw=true "Narrative Compare 1")

A counter on the Compare List prominently displays the number of items in the compare list.  After the user clicks the Compare List link in the upper right corner of the top navigation bar, the Compare List displays the selected items for comparison side by side.  

![Narrative Compare 2](./artifacts/Images/Narrative_Compare2.png?raw=true "Narrative Compare 2")

Users can view the following information about the products:

*   Product Name
*   Description
*   Category
*   OEM
*   SKU
*   Price
*   Contract Discount 

![Narrative Compare 3](./artifacts/Images/Narrative_Compare3.png?raw=true "Narrative Compare 3")

### 1.2.3   Shopping
Users can add items to the shopping cart by clicking the red “Add to Cart” button for each item. The button grays out once an item has been added to the cart and updates to read, “Added to Cart.” As with the compare feature, a counter on the Shopping Cart prominently displays the number of items that have been added to the cart. 
Users can view their cart at any time and adjust the quantities of the items they would like to purchase. To remove an item, users can enter a quantity of “0” and click “Update Cart” or click the “Remove” link next to the desired item. The cart provides a subtotal of the order and also allows the user to continue shopping via the “Continue Shopping” button, which returns the user to the Home Page. 

From the cart, the user can checkout by clicking “Proceed to Checkout.” On the Checkout Information page, the user will enter their contact information (Name, Phone Number, and Email Address, their Shipping Address, and select a Payment Account. For the purposes of the prototype, we created payment accounts for four state agencies to which users could attribute their order.  
Clicking “Back to Cart” allow the user to make any additional revisions to their cart if necessary. The user will click “Continue” when they are ready to proceed with the order. From the Review Order page, the user can click “Place Order” and an Order Confirmation page displays the order number. 
Users can view, track, and cancel placed orders from the “My Order History” page. For the purposes of the prototype, an order’s status will change from “Placed” to “Shipped” 15 minutes after the order was placed. The user can cancel the order while it is still in the “Placed” status by first clicking “View Order” from the Order History page and then “Cancel Order” from the Order Details page. 

### 1.2.4   Administrator’s (Admin) Tools
By selecting the “Admin” link, admins can perform key functions, including:
*   Maintaining the catalog of products available for users
*   Running reports to summarize purchase activity

![Narrative Admin](./artifacts/Images/Narrative_Admin.png?raw=true "Narrative Admin")

### 1.2.5   Adding, Editing, and Deleting Items from the Catalog
To add, edit, or delete any items from the catalog, click “Catalog” from the Admin Home page. 

![Narrative Admin Reports](./artifacts/Images/Narrative_Admin_Reports.png?raw=true "Narrative Admin Reports")



####    1.2.5.1 Adding Items to the Catalog

Click “Add Product” from the left menu to add items individually and enter the following formation:

*   Title
*   Contract
*   Contractor
*   CLIN
*   Contract Expiration
*   List Price
*   Contract Price
*   Manufacturer
*   Part Number
*   SKU
*   UNSPSC
*   Product Type
*   Category
*   Unit of Measure
*   Quantity per Unit of Measure (UOM)
*   Description
*   Image file name

Multiple items can be added by using clicking “Import Products” from the left menu and click “Choose File” to select a .CSV file to upload. Finally, click “Import CSV Inventory File.” We anticipate this feature could contribute to improved efficiency in maintaining the catalog by reducing the time it takes to upload items. Note the columns on the file correspond to the columns in the Prototype A resource data set. 
Admins can upload images by clicking “Import Images” from the left menu, selecting “Choose Files,” and then finally “Import Images.” 

####    1.2.5.2 Editing or Deleting Items

To edit or delete a catalog item, select “Catalog” from the Admin Product Management page. Then, find the row containing the item to be edited or deleted and click either “Edit” or “Delete” from the Options column.  LINK to: ReadMe Repository | Images | Narrative_Edit_Delete_Items.png

To delete multiple items from the catalog, select the checkbox next to the item and click “Delete selected”.

To easily locate catalog items, click the “Search” button from the Admin Product Management page and enter any of the following criteria:

*   Title
*   Contract
*   Contractor
*   CLIN
*   Contract Expiration
*   List Price
*   Contract Price
*   Manufacturer
*   Part Number
*   SKU
*   UNSPSC
*   Product Type
*   Category
*   Unit of Measure
*   Quantity per UOM
*   Description
*   Image file name

After clicking “Search,” results are displayed in a table format. The user can then edit or delete items from the search results page. 


### 1.2.6   Reports
To view reports on expenditures and purchases, click “Reports” from the Admin Home page. 

![Narrative Reports](./artifacts/Images/Narrative_Reports.png?raw=true "Narrative Reports")


The reports “Dashboard” is driven by start and end dates of the desired report period. After entering the start and end dates, click “Run Report” and the following reports display: 
*   **Expenditures by Product Type:** Displays volume of purchases ($) across three categories of products (Hardware, Software, and Services)
*   **Expenditures by Contractor:** Displays volume of purchases ($) across pre-established contracts
*   **Purchases by Account:** Displays volume of purchases ($) across payment account (selected at checkout)
*   **Purchase Trends:** Displays volume of purchases ($) by payment account across a period of time

![Narrative Run Reports](./artifacts/Images/Narrative_Run_Reports.png?raw=true "Narrative Run Reports")


The admin can also optionally filter data by selecting the order status (Placed, UserCancelled, and/or Shipped) from the top right of the Dashboard. Be aware that items in the Placed status transition to Shipped status 15 minutes after the order was placed for the purpose of the prototype. 

Click on any of the reports in the dashboard for a larger view. Alternatively, the user can click any of the reports from the left menu or “Expand All Charts.” To print a report, right-click any of the reports and select print. 
Additionally, the left menu contains the following report functions: 

*   **Expenditures Over time:** List of all orders placed in the reference period
*   **Report Data:** All transactions in the database for the reference period. Data can be downloaded for further analysis

*Note for the purposed of the prototype, the FEi Team developed tools to create orders for testing purposes and so that report data would be visible.* 


