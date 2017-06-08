window.generateFakeData = function () {
    $.when(
        seedOwningUnits(),
        seedRequestingUnits(),
        seedSupportUnits()
    )
        .then(function () {
            console.log("Four lists have been seeded...");
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
}