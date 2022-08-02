describe("Mercado Libre - Smoke Test - User Flow to filter auto data", () => {
  describe("Given a user visits the select country page", () => {
    before(() => {
      cy.visit('/')
    })

    describe('When the user clicks the argentinian flag', () => {
      before(() => {
        cy.get('#AR').should("contain", "Argentina").and("be.visible").click()
      })

      it('Then the url changes to mercadolibre.com.ar', () => {
        cy.url().should("contain","mercadolibre.com.ar")
      })
    })
  })

  describe("When a user selects the car category in the main menu", () => {
    beforeEach(() => {
      cy.intercept('/menu/departments').as('menuDepartment')
      cy.visit('https://www.mercadolibre.com.ar')
      cy.wait('@menuDepartment')
      cy.get('.nav-menu-categories-link').should("contain", "Categorías").and("be.visible").click({force: true})
      cy.get("ul.nav-categs-departments > li:nth-child(1) > a").should("contain","Vehículos").click({ force: true })
      cy.wait('@menuDepartment')
    })

    it('Then the url changes to https://www.mercadolibre.com.ar/c/autos-motos-y-otros#menu=categories', () => {
      cy.url().should("contain", "mercadolibre.com.ar/c/autos-motos-y-otros#menu=categories")
    })

    describe('When the user presses the search button in the auto page', () => {
      beforeEach(() => {
        cy.get(".andes-button--loud").scrollIntoView().should("be.visible").and("be.enabled").trigger("click")
        cy.wait('@menuDepartment')
      })

      it('Then the the url changes to https://autos.mercadolibre.com.ar/', () => {
        cy.url().should("contain", "autos.mercadolibre.com.ar")
      })
    })
  })

  describe("When a user visits autos.mercadolibre.com.ar", () => {
    let filterLabels = ["Hasta $ 2.000.000","Córdoba"]

    before(() => {
      cy.visit('https://autos.mercadolibre.com.ar/')
    })

    beforeEach(() => {
    })

    filterLabels.forEach((label) => {
      describe(`And applies the '${label}' filter`, () => {
        before(() => {
          cy.contains(".ui-search-filter-name", label).should("be.visible").click()
        })

        it(`Then the label '${label}' is shown in the applied filtered section`, () => {
          cy.get(".andes-tag__label").should("contain", label)
        })
      })
    })

    describe("And applies the ascending order sorting", () => {
      let ascendingOrderLabel = "Menor precio"
      let defaultLabel = "Más relevantes"

      before(() => {
        cy.contains(".ui-search-sort-filter button", defaultLabel ).and("be.enabled").trigger('click')
        cy.get("#andes-dropdown-más-relevantes-list-option-price_asc").click({ force: true })
      })

      it(`Then the ordered by label changes to '${ascendingOrderLabel}'`, () => {
        cy.contains("button > .andes-dropdown__display-values", ascendingOrderLabel)
      })

      it("and the url should match the filters", () => {
        cy.url().should("contain", "_OrderId_PRICE_PciaId_cordoba_PriceRange_0ARS-2000000ARS_NoIndex_True")
      })
    })
  })
})

