window.generateFakeData = function () {
    $.when(
        seedOwningUnits(),
        seedRequestingUnits(),
        seedSupportUnits(), /*seeds items in two lists*/
        seedEmailTemplates()
    )
        .then(function () {
            console.log("Five lists have been seeded...");
        });

    function seedOwningUnits() {
        return spSchemaProvisioner.insertListItems({
            listTitle: 'Owning Units',
            itemsToCreate: [
                { Name: 'JSOAC-E', Users: spSchemaProvisioner.fieldValues.generateForPersonField([_spPageContextInfo.userId]) }, 
                { Name: 'SOCEUR JMOC', Users: spSchemaProvisioner.fieldValues.generateForPersonField([_spPageContextInfo.userId]) }
            ]
        });
    }

    function seedSupportUnits() {
        return spSchemaProvisioner.insertListItems({
            listTitle: 'Support Units',
            itemsToCreate: _.map(_.times(6), function (item) { return generateSupportUnit(); })
        })
            .then(seedSubunits);


        function seedSubunits(supportUnitListItems) {
            var supportUnitIds = _.map(supportUnitListItems, function (item) {
                return item.get_id();
            });

            var subunitsToCreate = _.map(_.times(24), function (item) { return generateSubunit(); });

            return spSchemaProvisioner.insertListItems({
                listTitle: 'Subunits',
                itemsToCreate: subunitsToCreate
            })

            function generateSubunit() {
                return {
                    Name: generateSupportOrgName('Squadron'),
                    PocName: chance.name(),
                    PocPhone: chance.phone(),
                    PocEmail: chance.email(),
                    ParentUnit: spSchemaProvisioner.fieldValues.generateForLookupField(chance.pickone(supportUnitIds))
                };
            }
        }

        function generateSupportUnit() {
            return {
                Name: generateSupportOrgName('Group'),
                Email: chance.email(),
                VerificationDate: chance.date({ year: 2016 }).toISOString().split('T')[0],
                PhoneNumber: chance.phone(),
                Users: spSchemaProvisioner.fieldValues.generateForPersonField([_spPageContextInfo.userId])
            };
        }
    }

    function generateSupportOrgName(suffix) {
        var supportTypes = ['Special Operations', 'Special Tactics', 'Special Operations Support', 'Special Operations Maintenance', 'Special Operations Aircraft Maintenance', 'Special Operations Maintenance Support'];
        return [
            chance.natural({ min: 11, max: 88 }) + chance.pickone(['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th']),
            chance.pickone(supportTypes),
            suffix
        ].join(' ');
    }

    function seedRequestingUnits() {
        return spSchemaProvisioner.insertListItems({
            listTitle: 'Requesting Units',
            itemsToCreate: _.map(_.times(8), function (item) { return generateRequestUnit(); })
        });

        function generateRequestUnit() {
            var randomArmyUnit = chance.natural({ min: 11, max: 88 }) + chance.pickone(['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th']) + " SFG";
            var randomNavalUnit = "NSWU-" + chance.natural({ min: 11, max: 88 });
            return {
                Name: chance.pickone([randomArmyUnit, randomNavalUnit]),
                Email: chance.email(),
                VerificationDate: chance.date({ year: 2016 }).toISOString().split('T')[0],
                PhoneNumber: chance.phone()
            };
        }
    }

    function seedEmailTemplates() {
        return spSchemaProvisioner.insertListItems({
            listTitle: 'EmailTemplates',
            itemsToCreate: [
                { Title: 'AssignedToSupportUnit', Body: '${currentUser} has assigned ${title} to the ${supportUnit}.\n\nTo start assigning subunits and external units, click on the \'Support Unit\' tab at the below link:\n<a href="${url}">Link to MSR</a>\n\n${screenshot}' }, 
                { Title: 'Submitted', Body: '${currentUser} has submitted ${title}.\n\nTo take ownership of this MSR, click on the \'JSOAC/JMOC\' tab at the below link:\n<a href="${url}">Link to MSR</a>\n\n${screenshot}'},
                { Title: 'Vetting', Body: '${currentUser} has set the status of ${title} to Vetting.\n\n${owningUnits} will review your request to ensure it is valid and filled out correctly:\n<a href="${url}">Link to MSR</a>\n\n'},
                { Title: 'Planning', Body: '${currentUser} has set the status of ${title} to Planning.\n\n${supportUnit} will assign subunits and platforms (as needed) to fulfill your request:\n<a href="${url}">Link to MSR</a>\n\n'},
                { Title: 'Approved', Body: '${currentUser} has approved ${title}:\n<a href="${url}">Link to MSR</a>\n\n'}
            ]
        });
    }
}
