import { deepParseJson } from '../src';

describe('deepParseJson', () => {
  it('returns null when null is supplied', () => {
    expect(deepParseJson(null)).toBe(null);
  });
  it('returns undefined when undefined is supplied', () => {
    expect(deepParseJson(undefined)).toBe(undefined);
  });
  it('returns original value for string', () => {
    expect(deepParseJson('')).toBe('');
    expect(deepParseJson('siba')).toBe('siba');
  });
  it('returns original value for stringified number', () => {
    expect(deepParseJson('1')).toBe('1');
    expect(deepParseJson('0')).toBe('0');
    expect(deepParseJson('10')).toBe('10');
  });
  it('returns same number when passed as argument', () => {
    const val = 435;
    expect(deepParseJson(val)).toBe(val);
  });
  it('returns same object when passed as argument', () => {
    const stringified = { foo: 'bar' };
    expect(deepParseJson(stringified)).toStrictEqual(stringified);
  });
  it('returns same array when passed as argument', () => {
    const stringified = ['for', 'bar', 'baz'];
    expect(deepParseJson(stringified)).toStrictEqual(stringified);
  });
  it('returns parsed object when passed stringified object', () => {
    const stringified = '{ "foo": "bar" }';
    const expectedValue = { foo: 'bar' };
    expect(deepParseJson(stringified)).toStrictEqual(expectedValue);
  });
  it('returns parsed array when passed stringified array', () => {
    const stringified = '["foo", "bar", "baz"]';
    const expectedValue = ['foo', 'bar', 'baz'];
    expect(deepParseJson(stringified)).toStrictEqual(expectedValue);
  });
  it('able to parse object multi type values', () => {
    const stringified = '{"foo": "bar", "foobar": null, "foobarbaz": 55}';
    const expectedValue = { foo: 'bar', foobar: null, foobarbaz: 55 };
    expect(deepParseJson(stringified)).toStrictEqual(expectedValue);
  });
  it('able to parse array of objects', () => {
    const stringified =
      '[{"foo": "bar", "bar": "45", "baz": null}, {"foo": "bar", "bar": 45, "baz": null}]';
    const expectedValue = [
      { foo: 'bar', bar: '45', baz: null },
      { foo: 'bar', bar: 45, baz: null },
    ];
    expect(deepParseJson(stringified)).toStrictEqual(expectedValue);
  });
  it('able to parse nested objects', () => {
    const stringified = '{"foo":"{\\"bar\\":\\"baz\\"}"}';
    const expectedValue = { foo: { bar: 'baz' } };
    expect(deepParseJson(stringified)).toStrictEqual(expectedValue);
  });
  it('able to parse deeply nested objects', () => {
    const stringified =
      '{"person":"{\\"name\\":\\"siba\\",\\"others\\":\\"{\\\\\\"contacts\\\\\\":\\\\\\"{\\\\\\\\\\\\\\"phone\\\\\\\\\\\\\\":12345}\\\\\\"}\\"}"}';
    const expectedValue = { person: { name: 'siba', others: { contacts: { phone: 12345 } } } };
    expect(deepParseJson(stringified)).toStrictEqual(expectedValue);
  });
  it('able to parse deeply nested array', () => {
    const stringified =
      '["[\\"[\\\\\\"foo\\\\\\"]\\",\\"[\\\\\\"bar\\\\\\"]\\",\\"[\\\\\\"baz\\\\\\"]\\"]","[\\"[\\\\\\"foo\\\\\\"]\\",\\"[\\\\\\"bar\\\\\\"]\\",\\"[\\\\\\"baz\\\\\\"]\\"]"]';
    const expectedValue = [
      [['foo'], ['bar'], ['baz']],
      [['foo'], ['bar'], ['baz']],
    ];
    expect(deepParseJson(stringified)).toStrictEqual(expectedValue);
  });
});
