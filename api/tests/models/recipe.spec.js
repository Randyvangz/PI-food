const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Milanesa a la napolitana' });
      });
    });
  });
});
describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Milanesa a la napolitana' });
      });
    });

    describe('summary', () => {
      it('should throw an error if summary is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires summary')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ summary: 'deliciosas milas a la Nápoles :)' });
      });
    });

    describe('spoonacularScore', () => {
      it('should throw an error if spoonScore is not integer or decimal', (done) => {
        Recipe.create({spoonacularScore:"hola"})
          .then(() => done(new Error('It requires valid spoonacularScore')))
          .catch(() => done());
      });
      it('should work when its a valid score', () => {
        Recipe.create({ spoonacularScore: 99.9 });
      });
    });
    
    describe('healthScore', () => {
      it('should throw an error if health score is not integer or decimal', (done) => {
        Recipe.create({healthScore:"12,5"})
          .then(() => done(new Error('It requires valid healthScore')))
          .catch(() => done());
      });
      it('should work when its a valid score', () => {
        Recipe.create({ healthScore: 70 });
      });
    });

    describe('optional steps', () => {
      it('should allow no steps submited to a new recipe', () => {
        Recipe.create({})
      });
      it('should allow no steps submited to a new recipe', () => {
        Recipe.create({ steps: '' });
      });
    });

  });
});
