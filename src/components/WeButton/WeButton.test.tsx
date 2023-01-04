import {describe, test, expect, beforeEach, afterEach} from "vitest";
import {render, screen, cleanup, fireEvent, waitFor} from "@testing-library/react";
import React from "react";
import {WeButton} from "./WeButton";

describe("WeButton general tests", () => {

    beforeEach(() => {
        render(<WeButton>Click me</WeButton>);
    })

    afterEach(() => {
        cleanup();
    })

    test("Child text renders", () => {
        expect(screen.getByText(/Click me/i)).toBeDefined();
    });

});

describe("WeButton classname tests", () => {

    beforeEach(() => {
        render(<WeButton className="testClass">Click me</WeButton>);
    })

    afterEach(() => {
        cleanup();
    })

    test("Button classname prop works", () => {
        const element = screen.getByRole("button");
        expect(element.className).toContain("testClass");
    })
});
describe("WeButton normal variant", () => {
    beforeEach(() => {
        render(<WeButton>Click me</WeButton>);
    })

    afterEach(() => {
        cleanup();
    })

    test("Variant Prop is woriking", () => {
        const element = screen.getByRole("button");
        expect(element.className).toContain("variant-default");
    })

    test("Variant color is correct", () => {
        const element = screen.getByRole("button");
        const style = window.getComputedStyle(element);
        expect(style.backgroundColor).toBe("rgb(90, 6, 198)");
        expect(style.color).toBe("rgb(255, 255, 255)");
    })

});

describe("WeButton small variant", () => {
    beforeEach(() => {
        render(<WeButton variant="small">Click me</WeButton>);
    })

    afterEach(() => {
        cleanup();
    })

    test("Variant Prop is woriking", () => {
        const element = screen.getByRole("button");
        expect(element.className).toContain("variant-small");
    })

    test("Variant color is correct", () => {
        const element = screen.getByRole("button");
        const style = window.getComputedStyle(element);
        expect(style.backgroundColor).toBe("rgb(0, 0, 0)");
        expect(style.color).toBe("rgb(255, 255, 255)");
    })

});
