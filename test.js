const assert = require('chai').assert;
const expect = require('chai').expect;
const { deepParseJson } = require('./index');

describe('Test deepParseJson function', () => {
  it('should return null when passed null as argument', () => {
    assert.equal(deepParseJson(null), null);
  });
  it('should return undefined when passed undefined as argument', () => {
    assert.equal(deepParseJson(undefined), undefined);
  });
  it('should return same number when passed as argument', () => {
    const stringified = 435;
    assert.equal(deepParseJson(stringified), stringified);
  });
  it('should return same string when passed as argument', () => {
    const stringified = 'foobar';
    assert.equal(deepParseJson(stringified), stringified);
  });
  it('should return same object when passed as argument', () => {
    const stringified = { foo: 'bar' };
    expect(deepParseJson(stringified)).to.deep.equal(stringified);
  });
  it('should return same array when passed as argument', () => {
    const stringified = ['for', 'bar', 'baz'];
    expect(deepParseJson(stringified)).to.deep.equal(stringified);
  });
  it('should return parsed object when passed stringified object', () => {
    const stringified = '{ "foo": "bar" }';
    const expectedValue = { foo: 'bar' };
    expect(deepParseJson(stringified)).to.deep.equal(expectedValue);
  });
  it('should return parsed array when passed stringified array', () => {
    const stringified = '["foo", "bar", "baz"]';
    const expectedValue = ['foo', 'bar', 'baz'];
    expect(deepParseJson(stringified)).to.deep.equal(expectedValue);
  });
  it('should be able to parse object multi type values', () => {
    const stringified = '{"foo": "bar", "foobar": null, "foobarbaz": 55}';
    const expectedValue = { foo: 'bar', foobar: null, foobarbaz: 55 };
    expect(deepParseJson(stringified)).to.deep.equal(expectedValue);
  });
  it('should be able to parse array of objects', () => {
    const stringified = '[{"foo": "bar", "bar": 45, "baz": null}, {"foo": "bar", "bar": 45, "baz": null}]';
    const expectedValue = [{ foo: 'bar', bar: 45, baz: null }, { foo: 'bar', bar: 45, baz: null }];
    expect(deepParseJson(stringified)).to.deep.equal(expectedValue);
  });
  it('should be able to parse nested objects', () => {
    const stringified = '{"foo":"{\\"bar\\":\\"baz\\"}"}';
    const expectedValue = { foo: { bar: 'baz' } };
    expect(deepParseJson(stringified)).to.deep.equal(expectedValue);
  });
  it('should be able to parse deeply nested objects', () => {
    const stringified =
      '{"person":"{\\"name\\":\\"siba\\",\\"others\\":\\"{\\\\\\"contacts\\\\\\":\\\\\\"{\\\\\\\\\\\\\\"phone\\\\\\\\\\\\\\":12345}\\\\\\"}\\"}"}';
    const expectedValue = { person: { name: 'siba', others: { contacts: { phone: 12345 } } } };
    expect(deepParseJson(stringified)).to.deep.equal(expectedValue);
  });
  it('should be able to parse deeply nested array', () => {
    const stringified =
      '["[\\"[\\\\\\"foo\\\\\\"]\\",\\"[\\\\\\"bar\\\\\\"]\\",\\"[\\\\\\"baz\\\\\\"]\\"]","[\\"[\\\\\\"foo\\\\\\"]\\",\\"[\\\\\\"bar\\\\\\"]\\",\\"[\\\\\\"baz\\\\\\"]\\"]"]';
    const expectedValue = [[['foo'], ['bar'], ['baz']], [['foo'], ['bar'], ['baz']]];
    expect(deepParseJson(stringified)).to.deep.equal(expectedValue);
  });
});
