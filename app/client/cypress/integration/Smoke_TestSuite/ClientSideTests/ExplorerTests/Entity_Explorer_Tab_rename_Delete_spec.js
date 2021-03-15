const commonlocators = require("../../../../locators/commonlocators.json");
const Layoutpage = require("../../../../locators/Layout.json");
const widgetsPage = require("../../../../locators/Widgets.json");
const publish = require("../../../../locators/publishWidgetspage.json");
const dsl = require("../../../../fixtures/tabdsl.json");
const pages = require("../../../../locators/Pages.json");
const tabname = "UpdatedTab";

describe("Tab widget test", function() {
  const tabname = "UpdatedTab";
  before(() => {
    cy.addDsl(dsl);
  });

  it("Tab Widget Functionality To rename Tabs from entity explorer", function() {
    // cy.GlobalSearchEntity("Tab 1");
    cy.get("body").then(() => {
      cy.wait(2000);
      cy.ExpandAllExplorerEntities();
      cy.get(".t--entity.widget:contains(Tab 1)")
        .last()
        .RenameEntity(tabname);
    });
    // cy.RenameEntity(tabname);
  });

  it("Tab name validation in properties and widget ", function() {
    cy.openPropertyPane("tabswidget");
    cy.closePropertyPane();
    cy.get(Layoutpage.tabWidget)
      .contains(tabname)
      .click({ force: true })
      .should("be.visible");
  });

  it("Tab Widget Functionality To delete Tabs from entity explorer", function() {
    // cy.GlobalSearchEntity("Tab 2");
    cy.ExpandAllExplorerEntities();
    // cy.get(".t--entity.widget:contains(Tab 2)")
    //   .last()
    //   .RenameEntity(tabname);
    // cy.RenameEntity(tabname);
    // cy.validateMessage(tabname);
    cy.get(".t--entity.widget:contains(Tab 2)").last().deleteEntity();
    // cy.get(commonlocators.entityExplorersearch).should("be.visible");
    // cy.get(commonlocators.entityExplorersearch)
    //   .clear()
    //   .type("Tab 2");
    cy.get(".t--entity.widget:contains(Tab 2)")
    .should("not.exist");
  });

  /* To be enabled once the bug is fixed
    it("Publish app and check for the widget name", function() {
      cy.PublishtheApp();
      cy.get(publish.tabWidget)
        .contains(tabname)
        .click({ force: true })
        .should("be.selected");
      cy.get(publish.tabWidget)
        .contains("Tab 2")
        .click({ force: true })
        .should("be.selected");
    });
  
    it("Tab Widget Functionality To Unchecked Visible Widget", function() {
      cy.get(publish.backToEditor).click();
      cy.openPropertyPane("tabswidget");
      cy.closePropertyPane();
      cy.get(Layoutpage.tabWidget)
        .contains("Tab 2")
        .click({ force: true })
        .should("not.be.visible");
    });
    */
});

afterEach(() => {
  // put your clean up code if any
});