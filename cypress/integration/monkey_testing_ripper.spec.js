describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomEvent(10);
    })
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

function randomClick(monkeysLeft) {
    var monkeysLeft = monkeysLeft;
    if(monkeysLeft > 0) {
        cy.get('a').then($links => {
            var randomLink = $links.get(getRandomInt(0, $links.length - 1));
            console.log(!Cypress.dom.isHidden(randomLink));
            if(!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({force: true});
                monkeysLeft = monkeysLeft - 1;
            }
            setTimeout(randomClick, 1000, monkeysLeft);
        });
    }   
}

function randomEvent(monkeysLeft) {
    var commands = ['clickLink', 'writeInput', 'select', 'clickButton'];
    var monkeysLeft = monkeysLeft;
    
    if (monkeysLeft > 0) {
        var command = commands[getRandomInt(0, commands.length - 1)];
        if (command === 'clickLink') {
            cy.get('a').then($links => {
                var randomLink = $links.get(getRandomInt(0, $links.length - 1));
                if (!Cypress.dom.isHidden(randomLink)) {
                    cy.wrap(randomLink).click({force: true});
                    monkeysLeft = monkeysLeft - 1;
                }
                setTimeout(randomEvent, 1000, monkeysLeft);
            });
        } else if (command === 'writeInput') {
            cy.get('input').then($inputs => {
                var randomInput = $inputs.get(getRandomInt(0, $inputs.length - 1));
                if (!Cypress.dom.isHidden(randomInput)) {
                    cy.wrap(randomInput).type('Test de cf.agudelo12');
                    monkeysLeft = monkeysLeft - 1;
                }
                setTimeout(randomEvent, 1000, monkeysLeft);
            });
        } else if (command === 'select') {
            var randomSelect = $selects.get(getRandomInt(0, $selects.length - 1));
            if (randomSelect && randomSelect.id && !Cypress.dom.isHidden(randomSelect)) {
                cy.get(`#${randomSelect.id} option`).then($options => {
                    var randomOption = $options.get(getRandomInt(0, $options.length - 1));
                    cy.wrap(randomSelect).select(randomOption.value)
                    monkeysLeft = monkeysLeft - 1;
                });
            }
            setTimeout(randomEvent, 1500, monkeysLeft);
        } else if (command === 'clickButton') {
            cy.get('button').then($buttons => {
                var randomButton = $buttons.get(getRandomInt(0, $buttons.length - 1));
                if (!Cypress.dom.isHidden(randomButton)) {
                    cy.wrap(randomButton).click({force: true});
                    monkeysLeft = monkeysLeft - 1;
                }
                setTimeout(randomEvent, 1000, monkeysLeft);
            });
        }
    }
}
