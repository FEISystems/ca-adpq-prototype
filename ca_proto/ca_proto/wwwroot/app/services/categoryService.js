(function() {
    
    var categoryService = function () {
        var service = this;
        var getProductCategories = function(categoryId) {
            switch (categoryId) {
                case "alldesktops" :
                var category = {
                    "name" : "All Desktops",
                    "parentCategory" : "Hardware",
                    "filter" : {
                        "ProductType" : "Hardware",
                        "Category" : allDesktops()
                    }
                }
                return category;
                break;

                case "standarddesktops" :
                var category = {
                    "name" : "Standard Desktops",
                    "parentCategory" : "Hardware",
                    "filter" : {
                        "ProductType" : "Hardware",
                        "Category" : standardDesktops()
                    }
                }
                return category;
                break;

                case "powerdesktops" :
                var category = {
                    "name" : "Power Desktops",
                    "parentCategory" : "Hardware",
                    "filter" : {
                        "ProductType" : "Hardware",
                        "Category" : powerDesktops()
                    }
                }
                return category;
                break;

                case "workstations" :
                var category = {
                    "name" : "Workstations",
                    "parentCategory" : "Hardware",
                    "filter" : {
                        "ProductType" : "Hardware",
                        "Category" : workstations()
                    }
                }
                return category;
                break;

                case "thinclientdesktops" :
                var category = {
                    "name" : "Thin Client Desktops",
                    "parentCategory" : "Hardware",
                    "filter" : {
                        "ProductType" : "Hardware",
                        "Category" : thinClientDesktops()
                    }
                }
                return category;
                break;

                case "allinonedesktops" :
                var category = {
                    "name" : "All in One Desktops",
                    "parentCategory" : "Hardware",
                    "filter" : {
                        "ProductType" : "Hardware",
                        "Category" : allInOneDesktops()
                    }
                }
                return category;
                break;

                case "alllaptops" :
                var category = {
                    "name" : "All Laptops",
                    "parentCategory" : "Hardware",
                    "filter" : {
                        "ProductType" : "Hardware",
                        "Category" : allLaptops()
                    }
                }
                return category;
                break;

                case "standardlaptops" :
                var category = {
                    "name" : "Standard Laptops",
                    "parentCategory" : "Hardware",
                    "filter" : {
                        "ProductType" : "Hardware",
                        "Category" : standardLaptops()
                    }
                }
                return category;
                break;

                case "powerlaptops" :
                var category = {
                    "name" : "Power Laptops",
                    "parentCategory" : "Hardware",
                    "filter" : {
                        "ProductType" : "Hardware",
                        "Category" : powerLaptops()
                    }
                }
                return category;
                break;

                case "ultralightlaptops" :
                var category = {
                    "name" : "Ultralight Laptops",
                    "parentCategory" : "Hardware",
                    "filter" : {
                        "ProductType" : "Hardware",
                        "Category" : ultralightLaptops()
                    }
                }
                return category;
                break;

                case "mobileworkstations" :
                var category = {
                    "name" : "Mobile Workstations",
                    "parentCategory" : "Hardware",
                    "filter" : {
                        "ProductType" : "Hardware",
                        "Category" : mobileWorkstations()
                    }
                }
                return category;
                break;

                case "allaccessories" :
                var category = {
                    "name" : "All Accessories & Upgrades",
                    "parentCategory" : "Hardware",
                    "filter" : {
                        "ProductType" : "Hardware|Service|Software",
                        "Category" : allAccessoriesAndUpgrades()
                    }
                }
                return category;
                break;

                case "monitors" :
                var category = {
                    "name" : "Monitors",
                    "parentCategory" : "Hardware",
                    "filter" : {
                        "ProductType" : "Hardware|Service|Software",
                        "Category" : monitors()
                    }
                }
                return category;
                break;

                case "desktopaccessories" :
                var category = {
                    "name" : "Desktop Accessories",
                    "parentCategory" : "Hardware",
                    "filter" : {
                        "ProductType" : "Hardware",
                        "Category" : desktopAccessories()
                    }
                }
                return category;
                break;

                case "laptopaccessories" :
                var category = {
                    "name" : "Laptop Accessories",
                    "parentCategory" : "Hardware",
                    "filter" : {
                        "ProductType" : "Hardware",
                        "Category" : laptopAccessories()
                    }
                }
                return category;
                break;

                case "alldesktopservices" :
                var category = {
                    "name" : "All Desktop Services",
                    "parentCategory" : "Services",
                    "filter" : {
                        "ProductType" : "Service",
                        "Category" : allDesktopServices()
                    }
                }
                return category;
                break;

                case "standarddesktopservices" :
                var category = {
                    "name" : "Standard Desktop Services",
                    "parentCategory" : "Services",
                    "filter" : {
                        "ProductType" : "Service",
                        "Category" : standardDesktopServices()
                    }
                }
                return category;
                break;

                case "powerdesktopservices" :
                var category = {
                    "name" : "Power Desktop Services",
                    "parentCategory" : "Services",
                    "filter" : {
                        "ProductType" : "Service",
                        "Category" : powerDesktopServices()
                    }
                }
                return category;
                break;

                case "workstationservices" :
                var category = {
                    "name" : "Workstation Services",
                    "parentCategory" : "Services",
                    "filter" : {
                        "ProductType" : "Service",
                        "Category" : workstationServices()
                    }
                }
                return category;
                break;

                case "thinclientdesktopservices" :
                var category = {
                    "name" : "Thin Client Desktop Services",
                    "parentCategory" : "Services",
                    "filter" : {
                        "ProductType" : "Service",
                        "Category" : thinClientDesktopServices()
                    }
                }
                return category;
                break;

                case "allinonedesktopservices" :
                var category = {
                    "name" : "All in One Desktop Services",
                    "parentCategory" : "Services",
                    "filter" : {
                        "ProductType" : "Service",
                        "Category" : allInOneDesktopServices()
                    }
                }
                return category;
                break;

                case "alllaptopservices" :
                var category = {
                    "name" : "All Laptop Services",
                    "parentCategory" : "Services",
                    "filter" : {
                        "ProductType" : "Service",
                        "Category" : allLaptopServices()
                    }
                }
                return category;
                break;

                case "standardlaptopservices" :
                var category = {
                    "name" : "Standard Laptop Services",
                    "parentCategory" : "Services",
                    "filter" : {
                        "ProductType" : "Service",
                        "Category" : standardLaptopsServices()
                    }
                }
                return category;
                break;

                case "powerlaptopservices" :
                var category = {
                    "name" : "Power Laptop Services",
                    "parentCategory" : "Services",
                    "filter" : {
                        "ProductType" : "Service",
                        "Category" : powerLaptopServices()
                    }
                }
                return category;
                break;

                case "ultralightlaptopservices" :
                var category = {
                    "name" : "Ultralight Laptop Services",
                    "parentCategory" : "Services",
                    "filter" : {
                        "ProductType" : "Service",
                        "Category" : ultralightLaptopServices()
                    }
                }
                return category;
                break;

                case "mobileworkstationservices" :
                var category = {
                    "name" : "Mobile Workstation Services",
                    "parentCategory" : "Services",
                    "filter" : {
                        "ProductType" : "Service",
                        "Category" : mobileWorkstationServices()
                    }
                }
                return category;
                break;

                case "allvalueaddedservices" :
                var category = {
                    "name" : "All Value Added Services",
                    "parentCategory" : "Services",
                    "filter" : {
                        "ProductType" : "Service",
                        "Category" : allValueAddedServices()
                    }
                }
                return category;
                break;

                case "desktopvalueaddedservices" :
                var category = {
                    "name" : "Desktop Value Added Services",
                    "parentCategory" : "Services",
                    "filter" : {
                        "ProductType" : "Service",
                        "Category" : desktopValueAddedServices()
                    }
                }
                return category;
                break;

                case "laptopvalueaddedservices" :
                var category = {
                    "name" : "Laptop Value Added Services",
                    "parentCategory" : "Services",
                    "filter" : {
                        "ProductType" : "Service",
                        "Category" : laptopValueAddedServices()
                    }
                }
                return category;
                break;

                case "allsoftware" :
                var category = {
                    "name" : "All Software",
                    "parentCategory" : "Software",
                    "filter" : {"ProductType" : "Software"}
                }
                return category;
                break;

                default : var category = {
                    "name" : "Products List",
                    "filter" : {"Category" : ""}
                }
                return category;
                break;

            }
        };

        //Desktops
        var allDesktops = function () {
            var categoryFilters = [];
            categoryFilters.push(standardDesktops());
            categoryFilters.push(powerDesktops());
            categoryFilters.push(workstations());
            categoryFilters.push(thinClientDesktops());
            categoryFilters.push(allInOneDesktops());
            return categoryFilters.join("|");
        }

        var standardDesktops = function (){  
            var categories = [
                "Core Standard Desktop",
                "Standard Desktop Hardware"
            ];            
            return categories.join("|");
        }

        var powerDesktops = function (){ 
            var categories = [
                "Core Power Desktop",
                "Power Desktop Hardware"
            ];
            return categories.join("|");
        }

        var workstations = function (){ 
            var categories = [
                "Core Workstation Desktop",
                "Workstation Hardware"
            ];
            return categories.join("|");
        }

        var thinClientDesktops = function (){ 
            var categories = [
                "Core Thin Client Desktop",
                "Thin Client Hardware"
            ];
            return categories.join("|");
        }

        var allInOneDesktops = function (){ 
            var categories = [
                "All in One Hardware",
                "Core All-in-One Desktop"
            ];
            return categories.join("|");
        }
 
 
        //Laptops
        var allLaptops = function () {
            var categoryFilters = [];
            categoryFilters.push(standardLaptops());
            categoryFilters.push(powerLaptops());
            categoryFilters.push(ultralightLaptops());
            categoryFilters.push(mobileWorkstations());
            return categoryFilters.join("|");
        }

        var standardLaptops = function (){  
            var categories = [
                "Core Standard Laptop",
                "Standard Laptop Config"
            ];            
            return categories.join("|");
        }

        var powerLaptops = function (){ 
            var categories = [
                "Core Power Laptop",
                "Power Laptop Config"
            ];
            return categories.join("|");
        }

        var ultralightLaptops = function (){ 
            var categories = [
                "Core Ultralight Laptop",
                "Ultralight Laptop Config"
            ];
            return categories.join("|");
        }

        var mobileWorkstations = function (){ 
            var categories = [
                "Core Mobile Workstation Laptop",
                "Mobile Workstation Config"
            ];
            return categories.join("|");
        }
        
        //Accessories & Upgrades
        var allAccessoriesAndUpgrades = function () {
            var categoryFilters = [];
            categoryFilters.push(monitors());
            categoryFilters.push(desktopAccessories());
            categoryFilters.push(laptopAccessories());
            return categoryFilters.join("|");
        }

        var monitors = function (){  
            var categories = [
                "19 inch Standard MONITOR",
                "19 inch WideScreen MONITOR",
                "22 inch Touchscreen MONITOR",
                "22 inch Widescreen MONITOR",
                "24 inch Widescreen MONITOR",
                "28 inch Widescreen MONITOR",
                "30 inch Widescreen MONITOR",
                "Monitor Option/Upgrades",
                "Monitor Options Upgrades",
                "Monitor Service O/U",
                "Options Upgrades 19 Inch Widescreen Monitor O/U",
                "Options Upgrades 21 Inch Touchscreen Monitor",
                "Options Upgrades 22 Inch Widescreen",
                "Options Upgrades 24 Inch Widescreen Monitor",
                "P1917s P2217 P2417H Service Options Upgrades",
                "Service Options Upgrades for 30 inch monitors",
                "Service Options Upgrades Monitors",
                "Service Options Upgrades",
                "Service Options Upgrades for 30 inch monitors",
                "Service Options Upgrades Monitors",
            ];            
            return categories.join("|");
        }

        var desktopAccessories = function (){  
            var categories = [
                "600 Desktop Upgrades",
                "800 Mini  Upgrades",
                "AiO 800 Options Upgrades",
                "AiO Upgrade",
                "All In One Options Upgrades",
                "AOI Options Upgrades",
                "Micro Desktop Options",
                "Micro Standard Desktop Upgrades",
                "Options Upgrades",
                "POWER DESKTOP 800 Upgrade",
                "Power Desktop Options Upgrades",
                "Standard and Power Laptops",
                "Standard Desktop Options Upgrades",
                "Thin Client Options Upgrades",
                "Workstation Options Upgrades",
                "Z640 Options Upgrades"
            ];            
            return categories.join("|");
        }

        var laptopAccessories = function (){  
            var categories = [
                "Options Upgrades",
                "Options/Upgrade All Laptops",
                "Options/Upgrade Mobile Workstation Laptop 15",
                "Options/Upgrade Mobile Workstation Laptop 17",
                "Options/Upgrade Mobile Workstation Studio",
                "Options/Upgrade Standard Power Laptops",
                "Options/Upgrade Standard Power Laptops 640",
                "Options/Upgrade Standard Power Laptops 650",
                "Options/Upgrade Standard Power Mobile Laptops",
                "Options/Upgrade Ultralight Laptop",
                "Options/Upgrade Ultralight Laptop 820",
                "Options/Upgrades All Laptops",
                "Options/Upgrades Mobile Workstation",
                "Options/Upgrades Power Laptop",
                "Options/Upgrades Standard and Ultralight Laptop",
                "Options/Upgrades Standard Laptop",
                "Options/Upgrades Standard Power",
                "Options/Upgrades Standard Power and Ultralight Laptop",
                "Options/Upgrades Ultralight Laptop",
                "Standard Power and Ultralight Laptop"
            ];            
            return categories.join("|");
        }


        //Desktop Services
        var allDesktopServices = function () {
            var categoryFilters = ["Monitor Service O/U"];
            categoryFilters.push(standardDesktopServices());
            categoryFilters.push(powerDesktopServices());
            categoryFilters.push(workstationServices());
            categoryFilters.push(thinClientDesktopServices());
            categoryFilters.push(allInOneDesktopServices());
            return categoryFilters.join("|");
        }

        var standardDesktopServices = function (){  
            var categories = [                
                "Service Options Upgrades Standard/ Power Desktop",
                "Standard Desktop Service O/U",
            ];            
            return categories.join("|");
        }

        var powerDesktopServices = function (){  
            var categories = [
                "Power Desktop Service O/U",
                "Power Desktop Service O/U 7040",
                "Service Options Upgrades Standard/ Power Desktop",
            ];            
            return categories.join("|");
        }

        var workstationServices = function (){  
            var categories = [
                "Service Options Upgrades Workstation Desktop"
            ];            
            return categories.join("|");
        }

        var thinClientDesktopServices = function (){  
            var categories = [
                "Service Options Upgrades Thin Client Desktop",
                "Thin Client Service O/U",
            ];            
            return categories.join("|");
        }

        var allInOneDesktopServices = function (){  
            var categories = [
                "All In One Service O/U"
            ];            
            return categories.join("|");
        }

        
        //Laptop Services
        var allLaptopServices = function () {
            var categoryFilters = [];
            categoryFilters.push(standardLaptopsServices());
            categoryFilters.push(powerLaptopServices());
            categoryFilters.push(ultralightLaptopServices());
            categoryFilters.push(mobileWorkstationServices());
            return categoryFilters.join("|");
        }

        var standardLaptopsServices = function (){  
            var categories = [
                "Service Options/Upgrades All Laptops",
                "Service Options/Upgrades Standard Laptop",
                "Service Options/Upgrades Standard PowerUltralight",
            ];            
            return categories.join("|");
        }

        var powerLaptopServices = function (){ 
            var categories = [
                "Service Options/Upgrades All Laptops",
                "Service Options/Upgrades Power Laptop",
                "Service Options/Upgrades Standard PowerUltralight",
            ];
            return categories.join("|");
        }

        var ultralightLaptopServices = function (){ 
            var categories = [
                "Service Options/Upgrades All Laptops",
                "Service Options/Upgrades Standard PowerUltralight",
                "Service Options/Upgrades Ultralight Laptop"
            ];
            return categories.join("|");
        }

        var mobileWorkstationServices = function (){ 
            var categories = [
                "Service Options/Upgrades All Laptops",
                "Service Options/Upgrades Mobile Workstation",
                "Service Options/Upgrades Mobile Workstation Laptop",
            ];
            return categories.join("|");
        }


        
        //Value Added Services
        var allValueAddedServices = function () {
            var categoryFilters = [
                "NON-Core VAS - D Deployment & Logistics",
                "P1917s P2217 P2417H Service Options Upgrades",
                "Value added services",
                "VAS  Imaging",
                "VAS Asset Tagging - Bidder administration of State provided tag (with number)",
                "VAS Emergency Serices (4 hours response per occurrence)",
                "VAS Emergency Services (4 hour response per occurrence)",
                "VAS Imaging",
                "VAS Installation",
                "VAS Non-Core Deployment and Logistics",
                "VAS sset Tagging- Bidder adminstration of Sate provided tage (with number)",
                "VAS Take Back Services",
                "VAS Take-Back Services"
            ];
            categoryFilters.push(desktopValueAddedServices());
            categoryFilters.push(laptopValueAddedServices());
            return categoryFilters.join("|");
        };

        var desktopValueAddedServices = function () {
            var categories = [
                "VAS Standard Desktop",
            ];
            return categories.join("|");
        };

        var laptopValueAddedServices = function () {
            var categories = [
                "Value Added Services All Laptops",
            ];
            return categories.join("|");
        };

        var customSorters = [
            { column: "Title", ascending: true, description: "Title" },
            { column: "ContractPrice", ascending: true, description: "Price - Lowest First" },
            { column: "ContractPrice", ascending: false, description: "Price - Highest First" }
        ];

        var customSorter = customSorters[0];

        var setSorter = function(sorter) {
            customSorter = sorter;
        }

        var getSorter = function () {
            return customSorter;
        };

        var getCustomSorters = function () {
            return customSorters;
        };

        return {
            getProductCategories: getProductCategories,
            setSorter: setSorter,
            getSorter: getSorter,
            getCustomSorters: getCustomSorters,
        };
    }

    var module = angular.module("caWebApp");
    module.factory("categoryService", categoryService);
}())



// //All Desktops
// ["All in One Hardware",
// "Core All-in-One Desktop",
// "Core Power Desktop",
// "Core Standard Desktop",
// "Core Thin Client Desktop",
// "Core Workstation Desktop",
// "Micro Desktop Options",
// "Power Desktop Hardware",
// "Standard Desktop Hardware",
// "Thin Client Hardware",
// "Workstation Hardware"]

// //All Laptops
// ["Core Mobile Workstation Laptop",
// "Core Standard Laptop",
// "Core Power Laptop",
// "Core Ultralight Laptop",
// "Mobile Workstation Config",
// "Power Laptop Config",
// "Standard and Power Laptops",
// "Standard Laptop Config",
// "Standard Power and Ultralight Laptop",
// "Ultralight Laptop Config"]

// //All Software

// //All Services
// ["Monitor Service O/U",
// "NON-Core VAS - D Deployment & Logistics",
// "P1917s P2217 P2417H Service Options Upgrades",
// "Power Desktop Service O/U",
// "Power Desktop Service O/U 7040",
// "Service Options Upgrades",
// "Service Options Upgrades for 30 inch monitors",
// "Service Options Upgrades Monitors",
// "Service Options Upgrades Standard/ Power Desktop",
// "Service Options Upgrades Thin Client Desktop",
// "Service Options Upgrades Workstation Desktop",
// "Service Options/Upgrades All Laptops",
// "Service Options/Upgrades Mobile Workstation",
// "Service Options/Upgrades Mobile Workstation Laptop",
// "Service Options/Upgrades Power Laptop",
// "Service Options/Upgrades Standard Laptop",
// "Service Options/Upgrades Standard PowerUltralight",
// "Service Options/Upgrades Ultralight Laptop",
// "Standard Desktop Service O/U",
// "Thin Client Service O/U",
// "Value added services",
// "Value Added Services All Laptops",
// "VAS  Imaging",
// "VAS Asset Tagging - Bidder administration of State provided tag (with number)",
// "VAS Emergency Serices (4 hours response per occurrence)",
// "VAS Emergency Services (4 hour response per occurrence)",
// "VAS Imaging",
// "VAS Installation",
// "VAS Non-Core Deployment and Logistics",
// "VAS sset Tagging- Bidder adminstration of Sate provided tage (with number)",
// "VAS Standard Desktop",
// "VAS Take Back Services",
// "VAS Take-Back Services"]

// //Accessories + Upgrades
// ["600 Desktop Upgrades",
// "800 Mini  Upgrades",
// "AiO 800 Options Upgrades",
// "AiO Upgrade",
// "All In One Options Upgrades",
// "All In One Service O/U",
// "AOI Options Upgrades",
// "Micro Standard Desktop Upgrades",
// "Options Upgrades",
// "Monitor Option/Upgrades",
// "Monitor Options Upgrades",
// "Options Upgrades 19 Inch Widescreen Monitor O/U",
// "Options Upgrades 21 Inch Touchscreen Monitor",
// "Options Upgrades 22 Inch Widescreen",
// "Options Upgrades 24 Inch Widescreen Monitor",
// "Options/Upgrade All Laptops",
// "Options/Upgrade Mobile Workstation Laptop 15",
// "Options/Upgrade Mobile Workstation Laptop 17",
// "Options/Upgrade Mobile Workstation Studio",
// "Options/Upgrade Standard Power Laptops",
// "Options/Upgrade Standard Power Laptops 640",
// "Options/Upgrade Standard Power Laptops 650",
// "Options/Upgrade Standard Power Mobile Laptops",
// "Options/Upgrade Ultralight Laptop",
// "Options/Upgrade Ultralight Laptop 820",
// "Options/Upgrades All Laptops",
// "Options/Upgrades Mobile Workstation",
// "Options/Upgrades Power Laptop",
// "Options/Upgrades Standard and Ultralight Laptop",
// "Options/Upgrades Standard Laptop",
// "Options/Upgrades Standard Power",
// "Options/Upgrades Standard Power and Ultralight Laptop",
// "Options/Upgrades Ultralight Laptop",
// "POWER DESKTOP 800 Upgrade",
// "Power Desktop Options Upgrades",
// "Standard Desktop Options Upgrades",
// "Thin Client Options Upgrades",
// "Workstation Options Upgrades",
// "Z640 Options Upgrades"]

// //Monitors
// ["19 inch Standard MONITOR",
// "19 inch WideScreen MONITOR",
// "22 inch Touchscreen MONITOR",
// "22 inch Widescreen MONITOR",
// "24 inch Widescreen MONITOR",
// "28 inch Widescreen MONITOR",
// "30 inch Widescreen MONITOR",
// "Monitor Option/Upgrades",
// "Monitor Options Upgrades",
// "Monitor Service O/U",
// "Options Upgrades 19 Inch Widescreen Monitor O/U",
// "Options Upgrades 21 Inch Touchscreen Monitor",
// "Options Upgrades 22 Inch Widescreen",
// "Options Upgrades 24 Inch Widescreen Monitor",
// "Service Options Upgrades for 30 inch monitors",
// "Service Options Upgrades Monitors"]
