import {humanName, removeGaps, formatOptions, removeDuplicates} from '../src/utils';

// testing humanName
test("humanName", () => {
    // GIVEN name is init
    const name = "pancake";

    // WHEN humanName called
    const hName = humanName(name);

    // THEN expect the new name to be in a format
    expect(hName).toBe("Pancake");
});

test("humanName with empty string", () => {
    // GIVEN name is init
    const name = "";

    // WHEN humanName called
    const hName = humanName(name);

    // THEN expect the new name to be in a format
    expect(hName).toBe("");
});

test("humanName with number", () => {
    // GIVEN name is init
    const name = 12;

    // WHEN humanName called
    const hName = humanName(name);

    // THEN expect the new name to be in a format
    expect(hName).toBe("12");
});

test("humanName with null", () => {
    // GIVEN name is init
    const name = null;

    // WHEN humanName called
    const hName = humanName(name);

    // THEN expect the new name to be in a format
    expect(hName).toBe("");
});

test("humanName with undefined", () => {
    // GIVEN name is init
    let name;

    // WHEN humanName called
    const hName = humanName(name);

    // THEN expect the new name to be in a format
    expect(hName).toBe("");
});

// testing removeGaps
test("removeGaps", () => {
    // GIVEN name is init
    const name = "pancake is awesome";

    // WHEN removeGaps called
    const noGapsName = removeGaps(name);

    // THEN expect the new name to be in a format
    expect(noGapsName).toBe("pancakeisawesome");
});

test("removeGaps with empty string", () => {
    // GIVEN name is init
    const name = "";

    // WHEN removeGaps called
    const noGapsName = removeGaps(name);

    // THEN expect the new name to be in a format
    expect(noGapsName).toBe("");
});

test("removeGaps with number", () => {
    // GIVEN name is init
    const name = 12;

    // WHEN removeGaps called
    const noGapsName = removeGaps(name);

    // THEN expect the new name to be in a format
    expect(noGapsName).toBe("12");
});

test("removeGaps with null", () => {
    // GIVEN name is init
    const name = null;

    // WHEN removeGaps called
    const noGapsName = removeGaps(name);

    // THEN expect the new name to be in a format
    expect(noGapsName).toBe("");
});

test("removeGaps with undefined", () => {
    // GIVEN name is init
    let name;

    // WHEN removeGaps called
    const noGapsName = removeGaps(name);

    // THEN expect the new name to be in a format
    expect(noGapsName).toBe("");
});

// testing formatOptions
test("formatOptions", () => {
    // GIVEN opts is init
    const opts = ["pancake is awesome", "pancake is not awesome"];
    const expectedOutput = [
        {
            value: "pancakeisawesome",
            label: "pancake is awesome"
        }, {
            value: "pancakeisnotawesome",
            label: "pancake is not awesome"
        }
    ];

    // WHEN removeGaps called
    const formattedOpts = formatOptions(opts);

    // THEN expect the output to be in a format
    expect(formattedOpts).toEqual(expectedOutput);
});

test("formatOptions with empty array", () => {
    // GIVEN opts is init
    const opts = [];
    const expectedOutput = [];

    // WHEN removeGaps called
    const formattedOpts = formatOptions(opts);

    // THEN expect the output to be in a format
    expect(formattedOpts).toEqual(expectedOutput);
});

test("formatOptions with not array param", () => {
    // GIVEN opts is init
    const opts = "1232432";
    const expectedOutput = [];

    // WHEN removeGaps called
    const formattedOpts = formatOptions(opts);

    // THEN expect the output to be in a format
    expect(formattedOpts).toEqual(expectedOutput);
});

test("formatOptions with null", () => {
    // GIVEN opts is init
    const opts = null;
    const expectedOutput = [];

    // WHEN removeGaps called
    const formattedOpts = formatOptions(opts);

    // THEN expect the output to be in a format
    expect(formattedOpts).toEqual(expectedOutput);
});

test("formatOptions with undefined", () => {
    // GIVEN opts is init
    let opts;
    const expectedOutput = [];

    // WHEN removeGaps called
    const formattedOpts = formatOptions(opts);

    // THEN expect the output to be in a format
    expect(formattedOpts).toEqual(expectedOutput);
});

// testing removeDuplicates
test("removeDuplicates", () => {
    // GIVEN opts is init
    const listWithDuplicates = ["Action", " Action", "Drama", "Dra ma", "Drama", "Darma"];
    const listWithoutDuplicates = ["Action", "Drama", "Darma"];

    // WHEN removeGaps called
    const output = removeDuplicates(listWithDuplicates);

    // THEN expect the output to be in a format
    expect(output).toEqual(listWithoutDuplicates);
});

test("removeDuplicates with null", () => {
    // GIVEN opts is init
    const listWithDuplicates = null;
    const listWithoutDuplicates = [];

    // WHEN removeGaps called
    const output = removeDuplicates(listWithDuplicates);

    // THEN expect the output to be in a format
    expect(output).toEqual(listWithoutDuplicates);
});

test("removeDuplicates with undefined", () => {
    // GIVEN opts is init
    let listWithDuplicates;
    const listWithoutDuplicates = [];

    // WHEN removeGaps called
    const output = removeDuplicates(listWithDuplicates);

    // THEN expect the output to be in a format
    expect(output).toEqual(listWithoutDuplicates);
});