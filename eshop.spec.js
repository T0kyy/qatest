/// <reference types="cypress" />

const firstProduct = '#homefeatured > .first-in-line.first-item-of-tablet-line'
const firstProductName = '#homefeatured > .first-in-line.first-item-of-tablet-line > .product-container > .right-block > h5 > .product-name'
const tshirt = 'Faded Short Sleeve T-shirts'

function searchTshirt() {
  cy.get('#search_query_top').type('T-shirt')
  cy.get('#searchbox > .btn')
    .should('exist')
    .click()
}

function backToHome() {
  cy.get('.home')
    .should('exist')
    .click()
}

function primaryBlock() {
  cy.get('.primary_block')
      .should('contain.text', tshirt)
      .and('contain.text', 'Add to cart')
      .and('contain.text', 'Add to wishlist')
}

describe('E-shop test - Find section', () => {

  beforeEach(() => {
    cy.visit('http://automationpractice.com/index.php')
  })
  
  it('Browsing - Product is showing on the list of products page and it can be viewed and skipped', () => {

    cy.get(firstProduct)
      .should('be.visible')
      .and('contain.text', tshirt)
      .and('contain.text', 'Add to cart')
      .and('contain.text', 'More')

    cy.get(firstProductName).click()

    backToHome()
  })

  it('Browsing - Product can be placed to cart', () => {

    cy.get(firstProductName).click()

    primaryBlock()

    cy.get('.exclusive > span').click()

    cy.get('#layer_cart > .clearfix')
      .should('contain.text', tshirt)
      .and('contain.text', 'Continue shopping')
      .and('contain.text', 'Proceed to checkout')

    cy.get('.continue > span').click()
  })

  it('Searching - Product can be searched, viewed and skipped', () => {

    searchTshirt();

    cy.get('.ajax_block_product')
    .should('exist')
    .and('contain.text', tshirt)
    .and('contain.text', 'Add to cart')
    .and('contain.text', 'More')

    cy.get('.right-block > h5 > .product-name').click()

    primaryBlock()

    backToHome()
  })


  it('Searching - Product can be placed to cart', () => {

    searchTshirt();

    cy.get('.right-block > h5 > .product-name').click()

    primaryBlock()

    cy.get('.exclusive > span').click()

    cy.get('#layer_cart > .clearfix')
      .should('contain.text', tshirt)
      .and('contain.text', 'Continue shopping')
      .and('contain.text', 'Proceed to checkout')

    cy.get('.continue > span').click()
  })
})

function addToCart() {
  cy.get(firstProductName).click()

  primaryBlock()

  cy.get('.exclusive > span').click()

  cy.get('#layer_cart > .clearfix')
    .should('contain.text', tshirt)
    .and('contain.text', 'Continue shopping')
    .and('contain.text', 'Proceed to checkout')

  cy.get('.continue > span').click()
}

describe('E-shop test - Shopping cart section', () => {

  beforeEach(() => {
    cy.visit('http://automationpractice.com/index.php')
  })

  it('View shopping cart and then view product which is in cart', () => {

    addToCart()

    cy.get('[title="View my shopping cart"]').click()

    cy.get('#center_column')
      .should('contain.text', tshirt)
      .and('contain.text', 'Product')
      .and('contain.text', 'Proceed to checkout')
      .and('contain.text', 'Continue shopping')

    cy.get('.cart_navigation > .button > span')
      .should('be.visible')
      .and('have.css', 'border', '1px solid rgb(116, 213, 120)')

    cy.get('.cart_description > .product-name > a').click()
  })

  it('View shopping cart and then remove product which is in cart', () => {

    addToCart()

    cy.get('[title="View my shopping cart"]').click()

    cy.get('.icon-trash').click()

    cy.get('.alert')
      .should('contain.text', 'Your shopping cart is empty.')
      .and('have.css', 'background-color', 'rgb(254, 145, 38)')
  })

  it('View shopping cart and then checkout', () => {

    addToCart()

    cy.get('[title="View my shopping cart"]').click()

    cy.get('.cart_navigation > .button > span')
      .should('be.visible')
      .and('have.css', 'border', '1px solid rgb(116, 213, 120)')
      .click()

  })

})