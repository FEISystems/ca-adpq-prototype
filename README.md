# ca-adpq-prototype

[![Build status](https://ci.appveyor.com/api/projects/status/y66ddywcfi3mpn21/branch/devlocal/web/b?svg=true)](https://ci.appveyor.com/project/ryan-chadwick-fei/ca-adpq-prototype/branch/devlocal/web/b)  **devlocal**

[![Build status](https://ci.appveyor.com/api/projects/status/y66ddywcfi3mpn21/branch/Dev?svg=true)](https://ci.appveyor.com/project/ryan-chadwick-fei/ca-adpq-prototype/branch/Dev)  **latest**

[![Build status](https://ci.appveyor.com/api/projects/status/y66ddywcfi3mpn21/branch/stable/web/b?svg=true)](https://ci.appveyor.com/project/ryan-chadwick-fei/ca-adpq-prototype/branch/stable/web/b)  **stable**

[![Build status](https://ci.appveyor.com/api/projects/status/y66ddywcfi3mpn21/branch/production/web/b?svg=true)](https://ci.appveyor.com/project/ryan-chadwick-fei/ca-adpq-prototype/branch/production/web/b)  **production**

You can access the site [here](http://ca-adpq-prototype.eastus2.cloudapp.azure.com).

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



#   2. Technical Approach Requirements
##  2.1 Overall Agile Development Approach

When developing the prototype, FEi used an Agile Scrum process that is detaied in this [diagram](./artifacts/Agile Scrum Process/Agile_Development_Scrum_Process_Diagram.pdf).

During the planning stage, we analyzed the RFI requirements and selected Prototype A.  Then, we identified the roles and skillsets needed to complete the prototype and assembled a multi-disciplinary team based on the requirements of the project and Agile methodology. We developed a project budget and a schedule with three, one-week sprints. Throughout the sprints, the team worked as a single unit with daily stand-up meetings, frequent touchpoints, and demonstrations. More information is provided in the [Sprint Schedule](./artifacts/Sprint Schedule/Sprint_Schedule.pdf).

The overall project team was divided into the following functional teams to seamlessly perform like functions and responsibilities:

1.  **Leadership, Product Definition, and Requirements Team** – This team consisted of the Product Owner (PO) (Labor Category: Product Manager), Scrum Master (Labor Category: Delivery Manager), and Business Analysts. As the leader of the team, the PO was responsible for defining the scope, prioritizing the work items, and ensuring completeness of the work items. The Scrum Master fostered an Agile team environment by demonstrating Scrum tools and techniques. Additionally, the Scrum Master facilitated the development process by removing any impediments identified by the team members and asking each member what they completed yesterday and what they will perform today. Business Analysts created user stories and acceptance criteria. 

    -   Product Manager – Terry Boswell
    -   Scrum Master – Claire Reinken 
    -   Business Analysts – Lisa Lin-Freeman, Chris Gordon, and Ting Zhang

2.  **Visual and Frontend Development Team** – This team consisted of the Technical Architect, Visual Designer, Interaction Designers/User Researchers/Usability Testers, and Frontend Web Developers, and was responsible for designing the entire user experience, information architecture, journey maps, wireframes, and style guides. This team worked closely with the PO and the rest of the Requirements Team and the Backend Development Team to ensure working end-to-end functionality that is robust and satisfies the product requirements.
    -   Technical Architect – Jonas Bush
    -   Visual Designer – Jenny Ho
    -   Interaction Designers/User Researchers/Usability Testers – Ludwing Najera (Interaction Designer), Mike Wilburn (Usability Tester), Neelu Singh (Usability Tester), and Kristie Callander (Usability Tester)
    -   Frontend Web Developers – Luis Najera and Christian Heyd

3.  Backend Development Team – This team consisted of Backend Web Developer who performed database design (including augmenting the sample data provided by the State), created the search functions and other ancillary functions. The Backend Development Team also worked closely with the Requirements Team and the Visual and Frontend Team to ensure a working end-to-end functionality that is robust and satisfies the product requirements.

    -   Backend Web Developer – David Lorek

4.  DevOps Team – This team consisted of the DevOps Engineer who was responsible for writing the automation of infrastructure and maintaining it.
    -   DevOps Engineer – Ryan Chadwick

The FEi Team collaborated daily, using the Agile Scrum board to assess progress and assign work items. The Continuous Integration (CI) process established also helped with team interaction and with team (and work) integration, so that issues would be resolved in a timely manner. 

![Narrative Sprint3 Board](./artifacts/Images/Narrative_Sprint3_Board.png?raw=true "Narrative Sprint3 Board")


When bugs were found, the team immediately created issues and assigned them to the right team member, or the assignment was made during the stand-up meeting the next day. 

![Narrative Issues](./artifacts/Images/Narrative_Issues.png?raw=true "Narrative Issues")

##  2.2 List of Artifacts Used to Create the Prototype
Our team relied on the following artifacts to create the prototype:
*   **Sprint Schedule:** After an initial planning sprint, we conducted three, one-week sprints. A summary of sprint schedule and activities are included in the [Sprint Schedule](./artifacts/Sprint Schedule/Sprint_Schedule.pdf).

*   **Data Set:** The catalog product [data set](./artifacts/Data Set/Data Set_ADPQ_v5.csv) was based on the Prototype A data set provided by the State. 

*   **Images:** Images linked to this ReadMe file are located [here](./artifacts/Images/).


*   **Section 508 Compliance Scorecard:** The prototype was tested using the WAVE web accessibility tool and JAWS 16 screen reader. During initial testing, there were some errors that showed up when using WAVE as well as doing keyboard navigation and selection. There were no issues reported when testing with the JAWS 16 screen reader. Results were captured in the [Section 508 Compliance Scorecard](./artifacts/Section 508 Compliance/Section_508_Compliance_Scorecard.pdf) 

*   **Digital Services Playbook:** We followed U.S. Digital Service playbook guidelines. The process is described in greater detail in [section](./artifacts/Digital Services Playlist/Digital_Services_Playlist.pdf).

*   **Design Process:** Design notes, user testing notes, and wireframes can be found [here](./artifacts/Design Process/).

*   **User Stories and Acceptance Criteria:** We expanded the vendor challenge user story to include additional scenarios and for each user story and we also developed acceptance criteria for all [User Stories](./artifacts/User Stories). 

*   **Definition of Done:** We used a [checklist](./artifacts/Definition of Done Checklist/Definition_of_Done_Checkist.pdf) for the definition of done.

*   **Meeting Pictures:** We captured images from one of our [daily standup meetings](./artifacts/Meeting Pictures/).

*   **GitHub:** The prototype framework and libraries are included in GitHub, https://github.com/FEISystems/ca-adpq-prototype

*   **Survey Results:** In addition to the interviews, we fielded a brief online survey to gather usability feedback. The survey can be found: https://www.surveymonkey.com/r/7DXQ58L.  Survey results are shown [here](./artifacts/Survey Results/Survey.pdf).

*   **Test Scripts and Test Cases:** Quality Assurance (QA) activities included creating test cases (actors, preconditions, and test steps) as well as test scripts (actions, expected results, and test results in a Pass/Fail format) are shown [here](./artifacts/Test Cases/Test_Cases.xlsx).


##  2.3 Code Flow from Client UI, to JavaScript Library, to REST Service to Database, Pointing to Code in the GitHub Repository
The code uses a multi-tier approach. The User Interface (UI) Layer consists of AngularJS components that communicate to AngularJS services. These services utilize Ajax calls to access the Web.API controllers in the controller layer. The controller layer accesses the service layer which has the business logic embedded. When needed, the service layer accesses the MySQL Database via the repository layer. IoC injection is utilized through all the layers enabling unit testing. An [interactive code flow diagram](http://htmlpreview.github.com/?https://github.com/FEISystems/ca-adpq-prototype/blob/master/artifacts/Images/Code%20Flow.html) presents more details.


##  2.4 Technical Approach Requirements
In the following sections, we address each of the technical requirements described in the RFI and reference the corresponding GitHub issue number.

### a.  Assigned one (1) leader and gave that person authority and responsibility and held that person accountable for the quality of the prototype submitted

GitHub Issue #63

When we assembled the team, the Product Manager, Mr. Terry Boswell, was given the authority and responsibility for the quality of the prototype submitted. 

### b.  Assembled a multidisciplinary and collaborative team that includes, at a minimum, five (5) of the labor categories as identified in Attachment B: PQVP DS-AD Labor Category Descriptions

GitHub Issue #64

We assembled a multidisciplinary and collaborative team that included:

*   Leadership, Product Definition, and Requirements Team
    *   Product Manager – Terry Boswell
    *   Scrum Master – Claire Reinken 
    *   Business Analysts – Lisa Lin-Freeman, Chris Gordon, and Ting Zhang
*   Visual and Frontend Development Team
    *   Technical Architect – Jonas Bush
    *   Visual Designer – Jenny Ho
    *   Interaction Designers/User Researchers/Usability Testers – Ludwing Najera (Interaction Designer), Mike Wilburn (Usability Tester), Neelu Singh (Usability Tester), and Kristie Callander (Usability Tester)
    *   Frontend Web Developers – Luis Najera and Christian Heyd
*   Backend Development Team
    *   Backend Web Developer – David Lorek
*   DevOps Team
    *   DevOps Engineer – Ryan Chadwick


### c.  Understood what people needed, by including people in the prototype development and design process

GitHub Issue #46

Axure, a rapid prototyping tool, was used to design the application including the required features sets. The rapid prototype contained the necessary screens and features with sufficient detail to be tested by people. As a result, we were able to gain a better understanding of how people used the application including their needs and any pain points encountered. The information gathered from the user testing allowed our team to improve the application in subsequent iterations. 

[User Testing Notes](./artifacts/Design Process/User Testing/User_Testing_Notes.pdf)

[Survey Results](./artifacts/Survey Results/Survey.pdf)

### d.  Used at least a minimum of three (3) “user-centric design” techniques and/or tools

GitHub Issue #61

*   **Journey Maps:** Early in the requirements gathering phase, our team of Business Analysts and Interaction Designer/User Researcher/Usability Testers held a series of ideation sessions to gain a better understanding of the users’ needs and requirements. The journey map illustrates the users’ workflow and tasks they must complete in order to reach their goal. Our team of developers and designers use the [journey map](./artifacts/Design Process/Journey Maps/) as a reference for designing for the user’s needs. 

*   **Rapid Prototyping:** In order to build an application designed to meet the user needs, our team created fully functional [rapid prototypes](./artifacts/Design Process/Wireframes and Prototyping/) that were tested with users. The feedback collected from the users allowed our team to make improvements to the application early in the design phase, resulting in a better user experience and usability for the user. 

*   **User Testing:** To validate our designs and ensure that our application designing was consistent with user expectations and needs, we tested with users early and often. As a result of our testing, we were able to identify usability issues early and make corrections to the UI where necessary. The user testing allowed our team to better understand the users’ needs, and improve the application. We documented the [user testing feedback](./artifacts/Design Process/User Testing/User_Testing_Notes.pdf). 

### e.  Used GitHub to document code commits

GitHub Issue #68

GitHub was used as our source control system. Tickets were associated with commits as they were executed, https://github.com/FEISystems/ca-adpq-prototype 

### f.  Used Swagger to document the RESTful API, and provided a link to the Swagger API

GitHub Issue #47

Swagger was used to document the RESTful API. The links to the User Interface and JSON data are included below.

    User Interface:
    http://ca-adpq-prototype.eastus2.cloudapp.azure.com/swagger/index.html

    JSON Data:
    http://ca-adpq-prototype.eastus2.cloudapp.azure.com/swagger/v1/swagger.json

### g.  Complied with Section 508 of the Americans with Disabilities Act and WCAG 2.0

GitHub Issues #48, #120, #121, #122, #123, and #185

Section 508 of the Rehabilitation Act of 1973, as amended (29 U.S.C. § 794 (d)) provides accessibility guidelines for the development, procurement, maintenance, or use of Electronic and Information Technology (EIT). The amendment mandates that federal agencies must give disabled employees and members of the public access to information that is comparable to access available to others (Section 508 Law and Related Laws and Policies. (n.d.). Retrieved from https://www.section508.gov/content/learn/laws-and-policies). Based on Section 508 accessibility requirements, the U.S. Access Board established standards and guidelines as to how all federal agencies can ensure Section 508 compliance for web-based applications and information, software applications, operating systems, computers, telecommunication, multimedia products, documentation, and more. At FEi, Section 508 compliance is not an afterthought, and our team advocates for users with disabilities at every stage. When validating applications and documentation for Section 508 compliance, we address the concerns of individuals with disabilities by using manual and automated testing techniques to confirm full accessibility and usability.

To ensure compliance without incurring refactoring costs, our team weaves Section 508 requirements into design, development, and testing at the beginning of every project. FEi also carefully considered the design of the prototype to ensure 508 compliance up to WCAG AA level through utilizing the following guidelines and technology: 

*   W3C accessibility recommendations
*   WAI-ARIA (technology that makes advanced web applications accessible and usable to people with disabilities)
*   Americans with Disabilities Act (ADA) laws and regulations
*   Web Content Accessibility Guidelines (WCAG) 2.0
*   Principles of Accessibility: Perceivable, Operable, Understandable, Robust (POUR)
*   Assistive technology (e.g., screen readers, magnification, assistive listening devices)
*   Text, graphics, images, menus, breadcrumbs, forms, navigation, buttons, tables, accessibility tags, fonts, plugins, links, scripts, and applets
*   Code and markup that define page structure and presentation
*   Evaluation with web accessibility checkers, HTML and WCAG evaluators, and CSS validators
*   HTML elements (name, role, state, value)
*   HTML markup that conveys logical hierarchy
*   HTML tables (data, complex, simple, layout)
    *   Proper header, cell, row, and column associations
    *   Tables constructed to read logically from left to right and top to bottom
    *   Tables containing attributes to define meaning in the absence of context
    *   Layout, color, contrast, and cascading style sheets (CSS), including the disabling of CSS during testing
*   Form fields (FIELDSET, LEGEND, TABINDEX), radio buttons, checkboxes, labels (with FOR attribute), title attribute, order
*   Keyboard accessibility
    *   Logical tab order
    *   Accessible links
    *   Forms that can be navigated and completed
    *   Content that is accessible when displayed on hover
    *   Visual focus that moves with keyboard navigation

The prototype was tested using the WAVE web accessibility tool and JAWS 16 screen reader. During initial testing, there were some errors that showed up when using WAVE as well as doing keyboard navigation and selection. There were no issues reported when testing with the JAWS 16 screen reader. Please refer to the [508 Compliance Scorecard](./artifacts/Section 508 Compliance/Section_508_Compliance_Scorecard.pdf) for details. 


### h.  Created or used a design style guide and/or a pattern library

GitHub Issue #49

Our team used the U.S. Web Design Standards UI framework as a starting point for our style guide and pattern library. When using the U.S. Web Standards, our team of designers applied the styles creatively by adding our own variations of the styles. Where applicable, we updated the style guide to reflect our own variation on the U.S. Web Standards UI framework. 

### i.  Performed usability tests with people 

GitHub Issue #50

We held several rounds of user testing to ensure that we were achieving a high degree of usability in our application. In this effort, we identified and recruited a group of people to participate in our testing. Utilizing the rapid prototype created, we asked our participants to complete a series of tasks. During the testing sessions, our observers collected notes on the users’ interaction with the application, including user feedback, thoughts, recommendations and pain points.
As a result of our testing, our team was able to use the user feedback as a reference for improving our application subsequent iterations of the application development. 

We documented the user testing feedback [here](./artifacts/Design Process/User Testing/User_Testing_Notes.pdf).

### j.  Used an iterative approach, where feedback informed subsequent work or versions of the prototype

GitHub Issue #51

Our team used scrum, an Agile approach to iterative application development. Scrum provides a series of best practices and activities for planning and managing iterative development. At the end of our scrum iteration (known as a Sprint), Scrum provides a review and feedback activity called a sprint demo. During the sprint demo, the work in progress is demonstrated to our stakeholders and PO. The sprint demo allowed our team to provide feedback and comments and provided a good check point to ensure that the project kept moving in the right direction. The feedback and comments collected were documented as feature/bug backlog items and prioritized for implementation in subsequent sprints. 

### k.  Created a prototype that works on multiple devices, and presents a responsive design

GitHub Issue #52

Our Frontend Web Developers initially created wireframes and screen mockups, see LINK ReadMe Repository | Wireframes and Prototyping, and discussed the view of web components and layout in different types of devices. Once the wireframes and Axure prototyping were completed, the team developed the interactive code with selected technologies and frameworks (U.S. Web Design Standards UI and AngularJS), and tested using different types of devices, such as PC, Phones, and Tablets; we also used browser built-in tools to simulate devices. The use of the U.S. Web Design Standard UI framework allowed our frontend code to be fully responsive and tested across multiple browsers and device sizes, as well as to support accessibility needs.
The prototype has been tested using the following browsers: Internet Explorer 11, Google Chrome, and Firefox. In addition, the use of responsive web design desktop allows web pages to be viewed in response to the size of the device. FEi tested the prototype using the following devices and operating systems: PC (Windows 7 OS), Surface Pro (Windows 10), iPad (iOS9), Samsung Galaxy S5, and iPhone 6 (iOS9).

### l.  Used at least five (5) modern and open-source technologies, regardless of architectural layer (frontend, backend, etc.) 

GitHub Issue #52

FEi’s prototype uses modern, open technologies, and we used Agile (Scrum) processes to manage, design, develop, test, and deploy the prototype. The following standards and guidance are used or referred to in this prototype.
1.  Ubuntu Server 16.10
2.  dotnet core
3.  Docker Engine and Client
4.  MySQL 8
5.  AngularJS
6.  CenturyLink/Watchtower

### m.  Deployed the prototype on an Infrastructure as a Service (IaaS) or Platform as Service (PaaS) provider, and indicated which provider they used 

GitHub Issue #54

Azure provides simple CI that can deploy a project from GitHub to Azure App Service. To facilitate quick builds, we used this capability in two locations: internally and in Azure. Two instances of the prototype are hosted internally for QC purposes. These are hosted on our own virtual infrastructure and they are both tied into an automated CI/CD pipeline. The first instance always has the latest changes from the development branch. The second instance has the latest merges into the stable production branch.  Latest and greatest versus release candidate.

### n.  Developed automated unit tests for their code

GitHub Issue #55

The FEi  Team used X-Unit to write unit tests for the ASP.Net Core Business Logic. Our unit tests can be found in https://github.com/FEISystems/ca-adpq-prototype/tree/master/ca_proto/ca_proto_tests.

Unit Test Runner results are shown below.

![Unit Test Runner results](./artifacts/Images/N_Developed_Automated_Unit_Tests.png?raw=true "Unit Test Runner results")

### o.  Setup or used a continuous integration system to automate the running of tests and continuously deployed their code to their IaaS or PaaS provider 

GitHub Issue #56

The CI pipeline was set up to be simple and reliable. It uses two free tools that integrate with GitHub: AppVeyor and Docker Hub Automated Builds.

GitHub is configured to use web hook to notify AppVeyor of a ‘push’. This event triggers AppVeyor to ‘checkout’ the related branch from GitHub. It will then run a build of the ca_proto and ca_proto_service projects as well as run the tests located in the ca_proto_tests project. The build is customized and controlled using a file called appveyor.yml which contains the build instructions for AppVeyor. After the build and test it will push the published release back to GitHub.

This in turn triggers another web hook integration to Docker Hub Automated Builds. Docker Hub uses its cloud build service to ‘checkout’ the related branch from GitHub and build a Docker Image based on the Dockerfile contained in the branch. Once the Docker Image is built, it is placed into its Docker Hub repository.

The final step, deployment, utilizes a Docker Container called Watchtower. This tool monitors Docker Hub repositories linked to Docker images in the local Docker Engine repository.  It will periodically check for newer versions of each image per tag. When it detects a new image it will pull it, stop related containers, update them, and then restart them.

Project and repository links are listed below:

*   AppVeyor Project:  https://ci.appveyor.com/project/ryan-chadwick-fei/ca-adpq-prototype

*   Docker Hub Repository:  https://hub.docker.com/u/feidevops/

*   Watchtower Docker Hub Repository:  https://hub.docker.com/r/centurylink/watchtower/

*   Watchtower GitHub Repository:  https://github.com/v2tec/watchtower


### p.  Setup or used configuration management

GitHub Issue #57 

Configuration management has been applied to the CI/CD pipeline, host provisioning, and a few other application points.  There are several configuration items to be noted, all of which are stored in GitHub giving them version control and history.

Build Process configuration management can be found in AppVeyor and Docker build files.  These items are used directly by AppVeyor and Docker Hub when they check out the GitHub repository.  Configuration items for this process are:

*   appveyor.yml – this configuration file controls the details of each build.  It is used by AppVeyor to define build environment and execution scripts.

*  build_aspdotnet_core_latest.ps1 – this script is defined for use in the appveyor.yml configuration for the development branch

*   build_aspdotnet_core_stable.ps1 – this script is defined for use in the appveyor.yml configuration for the QC branch

*   build_aspdotnet_core_production.ps1 – this script is defined for use in the appveyor.yml configuration for the release branch

*   devops/Dockerfiles/Dockerfile-latest – this Dockerfile denotes how Docker Hub Automated Builds should process the development branch output

*   devops/Dockerfiles/Dockerfile-stable – this Dockerfile denotes how Docker Hub Automated Builds should process the QC branch output

*   devops/Dockerfiles/Dockerfile-production – this Dockerfile denotes how Docker Hub Automated Builds should process the release branch output

Since the prototype is hosted both internally and in Azure, separate scripts had to be created for each. SCVMM 2016 PowerShell scripts include the ability to recreate hosting internally on FEi Systems infrastructure. The Azure Resource Group template is used to provision the production host in the cloud. Configuration items for this process can be found in: 

*   devops/vmm-2016 – for internal FEi scripts
*   devops/Azure Resource Group Template – for Azure host provisioning

Some portions of the monitoring configuration, specifically the Prometheus exporter, can scrape jobs, which can be found:

*   devops/Prometheus.yml – this controls the frequency and scraping points for metrics collection to the Prometheus server

### q.  Setup or used continuous monitoring 

GitHub Issue #58

Continuous monitoring has been implemented using Prometheus, which is an aggregation and analytics server.  Prometheus also supports Alerting, but this was not implemented due to time constraints.

The Prometheus server gathers metrics from multiple locations. Each integration point is called an Exporter. We deployed four of these Exporters into our Production environment to monitor the application at different layers, including: 

*   MySQL Exporter – database
*   Collectd Exporter – host resources
*   Node Exporter – more system resources and HTTP
*   Containers Exporter – covers anything that implements libcontainer and includes Docker resource usage per container

In order to create meaningful dashboards, we coupled Prometheus with Grafana. This tool allows for customized dashboards based on gathered metrics from Prometheus.

Links for the tools in our Production environment and login information below:

**DockerDash**

    http://ca-adpq-prototype.eastus2.cloudapp.azure.com:5050
    admin/Letmein1!

**Prometheus**

    http://ca-adpq-prototype.eastus2.cloudapp.azure.com:9090/status

**Grafana**

    http://ca-adpq-prototype.eastus2.cloudapp.azure.com:3000/
    admin  Letmein1!     - administrative user
    monitor Letmein1!    - dashboard viewing only

### r.  Deployed their software in an open source container, such as Docker (i.e., utilized operating-system-level virtualization) 

GitHub Issue #59

FEi deployed the Docker Hub Repository for our containers as below.
    
    https://hub.docker.com/u/feidevops/

The environment build guides for QC and Production can be found in the [Docker Environment Builds.md](https://github.com/FEISystems/ca-adpq-prototype/blob/master/devops/Docker%20Environment%20Builds.md)

### s.  Provided sufficient documentation to install and run their prototype on another machine

GitHub Issue #: 167 

The following steps were used to install and configure Visual Studio Code:

**Install Visual Studio Code**

1.  Download the branch from Github, https://github.com/FEISystems/ca-adpq-prototype
2.  Download and Install MySQL
3.  Open MySQL Workbench
4.  Create a database named CA
5.  Execute the database creation ca_proto\ca_service\DbScripts\BuildDatabase.txt in MySQL Workbench
6.  Open the prototype in Visual Studio Code
7.  Modify the connection string in the ca_proto\ca_proto\appSetting.json file

**Configure Visual Studio Code**

1.  On the left side of VS Code, from the menu options, select the bottom icon which represents extensions. To run the prototype in VS Code you will need the C# extension to be installed.

    ![VS Code Step 1](./artifacts/Images/S_Install_Doc_Step_1.png?raw=true "VS Code Step 1")
 
2.  Once that extension is installed, go to the next menu icon up (Debug), and click on the Gear at the top (the tooltip will say “Configure or Fix launch.json”). 

    ![VS Code Step 2](./artifacts/Images/S_Install_Doc_Step_2.png?raw=true "VS Code Step 2")

3.  Select “.NET Core”, and VS Code will create a launch.json file. Once that is done, click the green “play” button. VS Code will show the following: 

    ![VS Code Step 3](./artifacts/Images/S_Install_Doc_Step_3.png?raw=true "VS Code Step 3")

4.  Select “Configure Task Runner,” then select “.NET Core” from the option list that follows. VS Code will create a “tasks.json” file. The tasks.json file needs to be modified to pass the location of the “project.json” file, modify the “args” property underneath the “tasks” property as follows: 

    ![VS Code Step 4](./artifacts/Images/S_Install_Doc_Step_4.png?raw=true "VS Code Step 4")

5.  Once this change is made, switch back to the “launch.json” file.  Under the entry for “.NET Core Launch (web)”, change the “program” and “cwd” attributes as follows: 

    ![VS Code Step 5](./artifacts/Images/S_Install_Doc_Step_5.png?raw=true "VS Code Step 5")

6.  The dependencies will then need to be restored. Go to the View | Integrated Terminal menu option. That should open a command prompt at the root of the repository. Change into the ca_proto directory and run “dotnet restore”: 

    ![VS Code Step 6](./artifacts/Images/S_Install_Doc_Step_6.png?raw=true "VS Code Step 6")

7.  Once this is done, go back to the Debug tab on the left, make sure that “.NET Core Launch (web)” is selected, and hit the play button.


### t.  Prototype and underlying platforms used to create and run the prototype are openly licensed and free of charge 

GitHub Issue #60

The following platforms were used to create and run the prototype (these platforms 
are openly licensed and free of charge):
*   Visual Studio Code 1.9 (create)
*   AppVeyor (create)
*   Two Docker tools
*   Docker Engine (local repository and container management) (run)
*   Docker Hub (automated builds and remote repository) (create)
*   MySQL 8 – specifically
*   .Net Core 1.1.0 (create and run)
*   Ubuntu Server 16.10 (run)

