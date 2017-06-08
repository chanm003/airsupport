var msrSchema = { lists: {}};
msrSchema.lists['Mission Support Request'] = {
    BaseTemplate: 'genericList',
    shouldHideTitleField: true,
    fieldsToCreate: [
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "OperationType",
            DisplayName: "OperationType",
            Type: "Text",
            Required: "FALSE"
        },
        {
            //EXAMPLE: DateTime
            Name: "MissionStart",
            DisplayName: "MissionStart",
            Type: "DateTime",
            Required: "FALSE",
            Format: "DateOnly", 					//please use either 'DateOnly' or 'DateTime'
            Default: '[today]'						//(optional)	
        },
        {
            //EXAMPLE: DateTime
            Name: "MissionEnd",
            DisplayName: "MissionEnd",
            Type: "DateTime",
            Required: "FALSE",
            Format: "DateOnly", 					//please use either 'DateOnly' or 'DateTime'
            Default: '[today]'
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "Status",
            DisplayName: "Status",
            Type: "Text",
            Required: "FALSE"
        },
        {
            //EXAMPLE: Person or Group 
            Name: "Requester",
            DisplayName: "Requester",
            Type: "User",
            Required: "FALSE",
            UserSelectionMode: "PeopleOnly",	//please specify either 'PeopleOnly' or 'PeopleAndGroups'
            ShowField: 'ImnName'				//Name with presence	
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "RequesterEmail",
            DisplayName: "RequesterEmail",
            Type: "Text",
            Required: "FALSE"
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "RequesterPhone",
            DisplayName: "RequesterPhone",
            Type: "Text",
            Required: "FALSE"
        },
        {
            //EXAMPLE: MULTIPLE LINE OF TEXT
            Name: "Conop",
            DisplayName: "Conop",
            Type: "Note",
            Required: "FALSE",
            NumLines: 6,
            RichText: "FALSE",						//RECOMMENDED
            AppendOnly: "FALSE"						//VERSIONING MUST BE TURNED ON, otherwise specifie "FALSE"

        },
        {
            //EXAMPLE: MULTIPLE LINE OF TEXT
            Name: "AirfieldLocations",
            DisplayName: "AirfieldLocations",
            Type: "Note",
            Required: "FALSE",
            NumLines: 6,
            RichText: "FALSE",						//RECOMMENDED
            AppendOnly: "FALSE"						//VERSIONING MUST BE TURNED ON, otherwise specifie "FALSE"
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "AltPOC",
            DisplayName: "AltPOC",
            Type: "Text",
            Required: "FALSE"
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "AltEmail",
            DisplayName: "AltEmail",
            Type: "Text",
            Required: "FALSE"
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "AltPhone",
            DisplayName: "AltPhone",
            Type: "Text",
            Required: "FALSE"
        },
        {
            //EXAMPLE: MULTIPLE LINE OF TEXT
            Name: "NegativeImpact",
            DisplayName: "NegativeImpact",
            Type: "Note",
            Required: "FALSE",
            NumLines: 6,
            RichText: "FALSE",						//RECOMMENDED
            AppendOnly: "FALSE"						//VERSIONING MUST BE TURNED ON, otherwise specifie "FALSE"

        },
        {
            //EXAMPLE: Yes/No 
            Name: "MedicalSupportRequired",
            DisplayName: "MedicalSupportRequired",
            Type: "Boolean",
            Default: 0								//(optional) Use 0 if you want default to be 'No', 1 if for 'Yes'
        },
        {
            //EXAMPLE: MULTIPLE LINE OF TEXT
            Name: "MedicalSupportReqs",
            DisplayName: "MedicalSupportReqs",
            Type: "Note",
            Required: "FALSE",
            NumLines: 6,
            RichText: "FALSE",						//RECOMMENDED
            AppendOnly: "FALSE"						//VERSIONING MUST BE TURNED ON, otherwise specifie "FALSE"

        },
        {
            //EXAMPLE: Yes/No 
            Name: "CommunicationSupportRequired",
            DisplayName: "CommunicationSupportRequired",
            Type: "Boolean",
            Default: 0								//(optional) Use 0 if you want default to be 'No', 1 if for 'Yes'
        },
        {
            //EXAMPLE: MULTIPLE LINE OF TEXT
            Name: "CommunicationSupportReqs",
            DisplayName: "CommunicationSupportReqs",
            Type: "Note",
            Required: "FALSE",
            NumLines: 6,
            RichText: "FALSE",						//RECOMMENDED
            AppendOnly: "FALSE"						//VERSIONING MUST BE TURNED ON, otherwise specifie "FALSE"
        },
        {
            //EXAMPLE: Number
            Name: "NumberOfPAX",
            DisplayName: "NumberOfPAX",
            Type: "Number",
            Required: "FALSE",
            Decimals: 0
        },
        {
            //EXAMPLE: Number
            Name: "NumberOfPallets",
            DisplayName: "NumberOfPallets",
            Type: "Number",
            Required: "FALSE",
            Decimals: 0
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "PaxBaggageWeight",
            DisplayName: "PaxBaggageWeight",
            Type: "Number",
            Required: "FALSE"
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "PalletWeight",
            DisplayName: "PalletWeight",
            Type: "Number",
            Required: "FALSE"
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "IsuType",
            DisplayName: "IsuType",
            Type: "Text",
            Required: "FALSE"
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "IsuWeight",
            DisplayName: "IsuWeight",
            Type: "Number",
            Required: "FALSE"
        },
        {
            //EXAMPLE: Yes/No 
            Name: "HazmatRequired",
            DisplayName: "HazmatRequired",
            Type: "Boolean",
            Default: 0								//(optional) Use 0 if you want default to be 'No', 1 if for 'Yes'
        },
        {
            //EXAMPLE: MULTIPLE LINE OF TEXT
            Name: "AmplifyingDetail",
            DisplayName: "AmplifyingDetail",
            Type: "Note",
            Required: "FALSE",
            NumLines: 6,
            RichText: "FALSE",						//RECOMMENDED
            AppendOnly: "FALSE"						//VERSIONING MUST BE TURNED ON, otherwise specifie "FALSE"
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "AirMobilityType",
            DisplayName: "AirMobilityType",
            Type: "Text",
            Required: "FALSE"
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "InfillExfillType",
            DisplayName: "InfillExfillType",
            Type: "Text",
            Required: "FALSE"
        },
        {
            //EXAMPLE: Yes/No 
            Name: "HoistRequired",
            DisplayName: "HoistRequired",
            Type: "Boolean",
            Default: 0								//(optional) Use 0 if you want default to be 'No', 1 if for 'Yes'
        },
        {
            //EXAMPLE: Yes/No 
            Name: "FastRopeRequired",
            DisplayName: "FastRopeRequired",
            Type: "Boolean",
            Default: 0								//(optional) Use 0 if you want default to be 'No', 1 if for 'Yes'
        },
        {
            //EXAMPLE: Yes/No 
            Name: "RappelRequired",
            DisplayName: "RappelRequired",
            Type: "Boolean",
            Default: 0								//(optional) Use 0 if you want default to be 'No', 1 if for 'Yes'
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "OtherAIE",
            DisplayName: "OtherAIE",
            Type: "Text",
            Required: "FALSE"
        },
        {
            //EXAMPLE: Yes/No 
            Name: "VehiclesRequired",
            DisplayName: "VehiclesRequired",
            Type: "Boolean",
            Default: 0								//(optional) Use 0 if you want default to be 'No', 1 if for 'Yes'
        },
        {
            //EXAMPLE: Yes/No 
            Name: "SurveysRequired",
            DisplayName: "SurveysRequired",
            Type: "Boolean",
            Default: 0								//(optional) Use 0 if you want default to be 'No', 1 if for 'Yes'
        },
        {
            //EXAMPLE: Number
            Name: "NumberOfPersonnel",
            DisplayName: "NumberOfPersonnel",
            Type: "Number",
            Required: "FALSE",
            Decimals: 0
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "ParachuteType",
            DisplayName: "ParachuteType",
            Type: "Text",
            Required: "FALSE"
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "ParachuteTypeOther",
            DisplayName: "ParachuteTypeOther",
            Type: "Text",
            Required: "FALSE"
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "TypeRelease",
            DisplayName: "TypeRelease",
            Type: "Text",
            Required: "FALSE"
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "FFEquipment",
            DisplayName: "FFEquipment",
            Type: "Text",
            Required: "FALSE"
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "EstimatedDimensionsHeight",
            DisplayName: "EstimatedDimensionsHeight",
            Type: "Number",
            Required: "FALSE"
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "EstimatedDimensionsLength",
            DisplayName: "EstimatedDimensionsLength",
            Type: "Number",
            Required: "FALSE"
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "EstimatedWeight",
            DisplayName: "EstimatedWeight",
            Type: "Number",
            Required: "FALSE"
        },
        {
            //EXAMPLE: Number
            Name: "NumberOfRefuelPointsRequired",
            DisplayName: "NumberOfRefuelPointsRequired",
            Type: "Number",
            Required: "FALSE",
            Decimals: 0
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "JtacCasType",
            DisplayName: "JtacCasType",
            Type: "Text",
            Required: "FALSE"
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "JtacFireType",
            DisplayName: "JtacFireType",
            Type: "Text",
            Required: "FALSE"
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "Pararescue",
            DisplayName: "Pararescue",
            Type: "Text",
            Required: "FALSE"
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "Surveys",
            DisplayName: "Surveys",
            Type: "Text",
            Required: "FALSE"
        },
        {
            //EXAMPLE: MULTIPLE LINE OF TEXT
            Name: "Notes",
            DisplayName: "Notes",
            Type: "Note",
            Required: "FALSE",
            NumLines: 6,
            RichText: "FALSE",						//RECOMMENDED
            AppendOnly: "FALSE"						//VERSIONING MUST BE TURNED ON, otherwise specifie "FALSE"
        },
        {
            //EXAMPLE: DateTime
            Name: "MissionSupportStart",
            DisplayName: "MissionSupportStart",
            Type: "DateTime",
            Required: "FALSE",
            Format: "DateOnly" 					//please use either 'DateOnly' or 'DateTime'
        },
        {
            //EXAMPLE: DateTime
            Name: "MissionSupportEnd",
            DisplayName: "MissionSupportEnd",
            Type: "DateTime",
            Required: "FALSE",
            Format: "DateOnly" 					//please use either 'DateOnly' or 'DateTime'
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "SupportLocation",
            DisplayName: "SupportLocation",
            Type: "Text",
            Required: "FALSE"
        },
        {
            //EXAMPLE: Yes/No 
            Name: "AircraftSecurityRequired",
            DisplayName: "AircraftSecurityRequired",
            Type: "Boolean",
            Default: 0								//(optional) Use 0 if you want default to be 'No', 1 if for 'Yes'
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "StagingLocation",
            DisplayName: "StagingLocation",
            Type: "Text",
            Required: "FALSE"
        },
        {
            //EXAMPLE: MULTIPLE LINE OF TEXT
            Name: "PNForces",
            DisplayName: "PNForces",
            Type: "Note",
            Required: "FALSE",
            NumLines: 6,
            RichText: "FALSE",						//RECOMMENDED
            AppendOnly: "FALSE",					//VERSIONING MUST BE TURNED ON, otherwise specifie "FALSE"
            JSON: true
        },
        {
            //EXAMPLE: MULTIPLE LINE OF TEXT
            Name: "DropZones",
            DisplayName: "DropZones",
            Type: "Note",
            Required: "FALSE",
            NumLines: 6,
            RichText: "FALSE",						//RECOMMENDED
            AppendOnly: "FALSE",					//VERSIONING MUST BE TURNED ON, otherwise specifie "FALSE"
            JSON: true
        },
        {
            //EXAMPLE: MULTIPLE LINE OF TEXT
            Name: "TargetLocations",
            DisplayName: "TargetLocations",
            Type: "Note",
            Required: "FALSE",
            NumLines: 6,
            RichText: "FALSE",						//RECOMMENDED
            AppendOnly: "FALSE",						//VERSIONING MUST BE TURNED ON, otherwise specifie "FALSE"
            JSON: true
        },
        {
            //EXAMPLE: MULTIPLE LINE OF TEXT
            Name: "Vehicles",
            DisplayName: "Vehicles",
            Type: "Note",
            Required: "FALSE",
            NumLines: 6,
            RichText: "FALSE",						//RECOMMENDED
            AppendOnly: "FALSE",						//VERSIONING MUST BE TURNED ON, otherwise specifie "FALSE"
            JSON: true
        },
        {
            //EXAMPLE: MULTIPLE LINE OF TEXT
            Name: "Platforms",
            DisplayName: "Platforms",
            Type: "Note",
            Required: "FALSE",
            NumLines: 6,
            RichText: "FALSE",						//RECOMMENDED
            AppendOnly: "FALSE",						//VERSIONING MUST BE TURNED ON, otherwise specifie "FALSE"
            JSON: true
        },
        {
            //EXAMPLE: MULTIPLE LINE OF TEXT
            Name: "LandingZones",
            DisplayName: "LandingZones",
            Type: "Note",
            Required: "FALSE",
            NumLines: 6,
            RichText: "FALSE",						//RECOMMENDED
            AppendOnly: "FALSE",						//VERSIONING MUST BE TURNED ON, otherwise specifie "FALSE"
            JSON: true
        },
        {
            //EXAMPLE: MULTIPLE LINE OF TEXT
            Name: "AssignedSubunits",
            DisplayName: "AssignedSubunits",
            Type: "Note",
            Required: "FALSE",
            NumLines: 6,
            RichText: "FALSE",						//RECOMMENDED
            AppendOnly: "FALSE",						//VERSIONING MUST BE TURNED ON, otherwise specifie "FALSE"
            JSON: true
        },
        {
            //EXAMPLE: MULTIPLE LINE OF TEXT
            Name: "AssignedOutsideUnits",
            DisplayName: "AssignedOutsideUnits",
            Type: "Note",
            Required: "FALSE",
            NumLines: 6,
            RichText: "FALSE",						//RECOMMENDED
            AppendOnly: "FALSE",						//VERSIONING MUST BE TURNED ON, otherwise specifie "FALSE"
            JSON: true
        },
        {
            //EXAMPLE: MULTIPLE LINE OF TEXT
            Name: "RelatedMission",
            DisplayName: "RelatedMission",
            Type: "Note",
            Required: "FALSE",
            NumLines: 6,
            RichText: "FALSE",						//RECOMMENDED
            AppendOnly: "FALSE",						//VERSIONING MUST BE TURNED ON, otherwise specifie "FALSE"
            JSON: true
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "RelatedMissionId",
            DisplayName: "RelatedMissionId",
            Type: "Text",
            Required: "FALSE"
        },
        {
            //EXAMPLE: Lookup field
            Name: "OwningUnits",
            DisplayName: "Owning Units",
            Type: "LookupMulti",
            Required: "FALSE",
            List: "Owning Units",
            ShowField: 'Name',
            Mult: "TRUE"
        },
        {
            //EXAMPLE: Lookup field
            Name: "RequestingUnit",
            DisplayName: "Requesting Unit",
            Type: "Lookup",
            Required: "FALSE",
            List: "Requesting Units",
            ShowField: 'Name'
        },
        {
            //EXAMPLE: Lookup field
            Name: "SupportUnit",
            DisplayName: "Support Unit",
            Type: "Lookup",
            Required: "FALSE",
            List: "Support Units",
            ShowField: 'Name'
        }
    ]
};

msrSchema.lists['Operation Type Owners'] = {
    BaseTemplate: 'genericList',
    shouldHideTitleField: true,
    fieldsToCreate: [
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "OperationType",
            DisplayName: "Operation Type",
            Type: "Text",
            Required: "TRUE"
        },
        {
            //EXAMPLE: Lookup field
            Name: "OwningUnit",
            DisplayName: "Owning Unit",
            Type: "Lookup",
            Required: "FALSE",
            List: "Owning Units",
            ShowField: 'Name'
        }
    ]
};

msrSchema.lists['Owning Units'] = {
    BaseTemplate: 'genericList',
    shouldHideTitleField: true,
    fieldsToCreate: [
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "Name",
            DisplayName: "Name",
            Type: "Text",
            Required: "TRUE"
        },
        {
            //EXAMPLE: Person or Group (allow multiple)
            Name: "Users",
            DisplayName: "Users",
            Type: "UserMulti",
            Required: "TRUE",
            UserSelectionMode: "PeopleOnly",	//please specify either 'PeopleOnly' or 'PeopleAndGroups'
            ShowField: 'ImnName',				//Name with presence	
            Mult: "TRUE",
            Description: "Identify ALL users that need to see the tab: JSOAC/JMOC"
        }
    ]
};

msrSchema.lists['Requesting Units'] = {
    BaseTemplate: 'genericList',
    shouldHideTitleField: true,
    fieldsToCreate: [
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "Name",
            DisplayName: "Name",
            Type: "Text",
            Required: "TRUE"
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "Email",
            DisplayName: "Email",
            Type: "Text",
            Required: "TRUE"
        },
        {
            //EXAMPLE: DateTime
            Name: "VerificationDate",
            DisplayName: "Verification Date",
            Type: "DateTime",
            Required: "FALSE",
            Format: "DateOnly"					//please use either 'DateOnly' or 'DateTime'
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "PhoneNumber",
            DisplayName: "Phone Number",
            Type: "Text",
            Required: "TRUE"
        }
    ]
};

msrSchema.lists['Support Units'] = {
    BaseTemplate: 'genericList',
    shouldHideTitleField: true,
    fieldsToCreate: [
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "Name",
            DisplayName: "Name",
            Type: "Text",
            Required: "TRUE"
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "Email",
            DisplayName: "Email",
            Type: "Text",
            Required: "TRUE"
        },
        {
            //EXAMPLE: DateTime
            Name: "VerificationDate",
            DisplayName: "Verification Date",
            Type: "DateTime",
            Required: "FALSE",
            Format: "DateOnly"					//please use either 'DateOnly' or 'DateTime'
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "PhoneNumber",
            DisplayName: "Phone Number",
            Type: "Text",
            Required: "TRUE"
        },
        {
            //EXAMPLE: Person or Group (allow multiple)
            Name: "Users",
            DisplayName: "Users",
            Type: "UserMulti",
            Required: "TRUE",
            UserSelectionMode: "PeopleOnly",	//please specify either 'PeopleOnly' or 'PeopleAndGroups'
            ShowField: 'ImnName',				//Name with presence	
            Mult: "TRUE",
            Description: "Identify ALL users that need to see the tab: Support Unit"
        }
    ]
};

msrSchema.lists['Subunits'] = {
    BaseTemplate: 'genericList',
    shouldHideTitleField: true,
    fieldsToCreate: [
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "Name",
            DisplayName: "Name",
            Type: "Text",
            Required: "TRUE"
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "PocName",
            DisplayName: "POC Name",
            Type: "Text",
            Required: "TRUE"
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "PocPhone",
            DisplayName: "POC Phone",
            Type: "Text",
            Required: "TRUE"
        },
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "PocEmail",
            DisplayName: "POC Email",
            Type: "Text",
            Required: "TRUE"
        },
        {
            //EXAMPLE: Lookup field
            Name: "ParentUnit",
            DisplayName: "Parent Unit",
            Type: "Lookup",
            Required: "TRUE",
            List: "Support Units",
            ShowField: 'Name'
        }
    ]
};

msrSchema.lists['Newsfeed'] = {
    BaseTemplate: 'genericList',
    shouldHideTitleField: true,
    fieldsToCreate: [
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "Type",
            DisplayName: "Type",
            Type: "Text",
            Required: "TRUE"
        },
        {
            //EXAMPLE: MULTIPLE LINE OF TEXT
            Name: "JSON",
            DisplayName: "JSON",
            Type: "Note",
            Required: "FALSE",
            NumLines: 6,
            RichText: "FALSE",						//RECOMMENDED
            AppendOnly: "FALSE"					//VERSIONING MUST BE TURNED ON, otherwise specifie "FALSE"
        },
        {
            //EXAMPLE: Lookup field
            Name: "RelatedMsr",
            DisplayName: "Related MSR",
            Type: "Lookup",
            Required: "TRUE",
            List: "Mission Support Request",
            ShowField: 'ID'
        }
    ]
};

msrSchema.lists['EmailTemplates'] = {
    BaseTemplate: 'genericList',
    shouldHideTitleField: true,
    fieldsToCreate: [
        {
            //EXAMPLE: MULTIPLE LINE OF TEXT
            Name: "Body",
            DisplayName: "Body",
            Type: "Note",
            Required: "FALSE",
            NumLines: 24,
            RichText: "FALSE",						//RECOMMENDED
            AppendOnly: "FALSE"					//VERSIONING MUST BE TURNED ON, otherwise specifie "FALSE"
        },
        {
            //EXAMPLE: MULTIPLE LINE OF TEXT
            Name: "TokensDescription",
            DisplayName: "Description of Available Tokens",
            Type: "Note",
            Required: "FALSE",
            NumLines: 6,
            RichText: "FALSE",						//RECOMMENDED
            AppendOnly: "FALSE"					//VERSIONING MUST BE TURNED ON, otherwise specifie "FALSE"
        }
    ]
};