import { render, screen } from "@testing-library/react";
import { SignatureDialog } from "./signature-dialog";
import userEvent from "@testing-library/user-event";

describe("Dialog test", () => {
  it("should display trigger", () => {
    render(
      <SignatureDialog setImage={() => {}}>
        <button>trigger</button>
      </SignatureDialog>
    );
    const query = screen.queryByText(/trigger/);
    expect(query).toBeVisible();
  });

  it("should render dialog when pressing trigger", async () => {
    render(
      <SignatureDialog setImage={() => {}}>
        <button>trigger</button>
      </SignatureDialog>
    );
    const trigger = screen.getByText(/trigger/);
    await userEvent.click(trigger);

    const query = screen.queryByText("Add Signature");
    expect(query).toBeVisible();
    const dialogQuery = screen.queryByRole("dialog");
    expect(dialogQuery).toBeVisible();
  });

  it("should have draw tab active rendering dialog", async () => {
    render(
      <SignatureDialog setImage={() => {}}>
        <button>trigger</button>
      </SignatureDialog>
    );
    const trigger = screen.getByText(/trigger/);
    await userEvent.click(trigger);

    const drawTextQuery = screen.queryByText("Draw");
    expect(drawTextQuery).toBeVisible();
    expect(drawTextQuery).toHaveClass("text-brand"); // brand color - purple

    const typeTextQuery = screen.queryByText("Type");
    expect(typeTextQuery).toBeVisible();
    expect(typeTextQuery).not.toHaveClass("text-brand");
  });

  it("should have type tab active after pressing it", async () => {
    render(
      <SignatureDialog setImage={() => {}}>
        <button>trigger</button>
      </SignatureDialog>
    );
    const trigger = screen.getByText(/trigger/);
    await userEvent.click(trigger);

    const drawTextQuery = screen.getByText("Draw");
    const typeTextQuery = screen.getByText("Type");
    expect(drawTextQuery).toBeVisible();
    expect(drawTextQuery).toHaveClass("text-brand");

    expect(typeTextQuery).toBeVisible();
    expect(typeTextQuery).not.toHaveClass("text-brand");

    await userEvent.click(typeTextQuery);
    expect(drawTextQuery).toBeVisible();
    expect(drawTextQuery).not.toHaveClass("text-brand");

    expect(typeTextQuery).toBeVisible();
    expect(typeTextQuery).toHaveClass("text-brand");
  });

  it("should have draw tab active after pressing it after pressing type", async () => {
    render(
      <SignatureDialog setImage={() => {}}>
        <button>trigger</button>
      </SignatureDialog>
    );
    const trigger = screen.getByText(/trigger/);
    await userEvent.click(trigger);

    const drawTextQuery = screen.getByText("Draw");
    const typeTextQuery = screen.getByText("Type");
    expect(drawTextQuery).toBeVisible();
    expect(drawTextQuery).toHaveClass("text-brand");

    expect(typeTextQuery).toBeVisible();
    expect(typeTextQuery).not.toHaveClass("text-brand");

    await userEvent.click(typeTextQuery);
    expect(drawTextQuery).toBeVisible();
    expect(drawTextQuery).not.toHaveClass("text-brand");

    expect(typeTextQuery).toBeVisible();
    expect(typeTextQuery).toHaveClass("text-brand");

    await userEvent.click(drawTextQuery);
    expect(drawTextQuery).toBeVisible();
    expect(drawTextQuery).toHaveClass("text-brand");

    expect(typeTextQuery).toBeVisible();
    expect(typeTextQuery).not.toHaveClass("text-brand");
  });

  it("should have proper input components visible on draw tab", async () => {
    render(
      <SignatureDialog setImage={() => {}}>
        <button>trigger</button>
      </SignatureDialog>
    );
    const trigger = screen.getByText(/trigger/);
    await userEvent.click(trigger);

    const drawSignaturePadQuery = screen.queryByTestId("signature-pad");
    expect(drawSignaturePadQuery).toBeVisible();

    const inputSignatureQuery = screen.queryByTestId("signature-input");
    expect(inputSignatureQuery).toBeNull();
  });

  it("should have proper input components visible on type tab", async () => {
    render(
      <SignatureDialog setImage={() => {}}>
        <button>trigger</button>
      </SignatureDialog>
    );
    const trigger = screen.getByText(/trigger/);
    await userEvent.click(trigger);

    await userEvent.click(screen.getByText("Type"));

    const drawSignaturePadQuery = screen.queryByTestId("signature-pad");
    expect(drawSignaturePadQuery).toBeNull();

    const inputSignatureQuery = screen.queryByTestId("signature-input");
    expect(inputSignatureQuery).toBeVisible();
  });

  it("should not render the dialog after pressing cancel button", async () => {
    render(
      <SignatureDialog setImage={() => {}}>
        <button>trigger</button>
      </SignatureDialog>
    );
    const trigger = screen.getByText(/trigger/);
    await userEvent.click(trigger);

    await userEvent.click(screen.getByText("Cancel"));
    const query = screen.queryByRole("dialog");
    expect(query).toBeNull();
  });
});

describe("User input", () => {
  it("should match all 4 font selectors with default input text on type tab", async () => {
    render(
      <SignatureDialog setImage={() => {}}>
        <button>trigger</button>
      </SignatureDialog>
    );

    const trigger = screen.getByText(/trigger/);
    await userEvent.click(trigger);

    const defaultSignatureText = "Signature";
    await userEvent.click(screen.getByText("Type"));

    const inputTextQuery = screen.queryByTestId("signature-input");
    expect(inputTextQuery).toHaveValue(defaultSignatureText);
    const radioLabels = screen.queryAllByLabelText(defaultSignatureText);
    expect(radioLabels).toHaveLength(4);
  });

  it("should change font selectors with input text", async () => {
    render(
      <SignatureDialog setImage={() => {}}>
        <button>trigger</button>
      </SignatureDialog>
    );
    const testString = "My Test String";
    const trigger = screen.getByText(/trigger/);
    await userEvent.click(trigger);

    const defaultSignatureText = "Signature";
    await userEvent.click(screen.getByText("Type"));

    const inputTextQuery = screen.getByTestId("signature-input");
    expect(inputTextQuery).toHaveValue(defaultSignatureText);
    const radioLabelsQuery = screen.getAllByLabelText(
      defaultSignatureText
    );
    expect(radioLabelsQuery).toHaveLength(4);

    await userEvent.type(inputTextQuery, testString);
    expect(inputTextQuery).toHaveValue(testString);
    // assert that the radio labels changed

    expect(screen.queryAllByLabelText(defaultSignatureText)).toHaveLength(
      0
    );
    expect(screen.queryAllByLabelText(testString)).toHaveLength(4);
  });

  it("should enable Done button after inputting text", async () => {
    render(
      <SignatureDialog setImage={() => {}}>
        <button>trigger</button>
      </SignatureDialog>
    );
    const trigger = screen.getByText(/trigger/);
    await userEvent.click(trigger);

    await userEvent.click(screen.getByText("Type"));
    // assert done is disabled
    const submitBtn = screen.getByText("Done");
    expect(submitBtn).toBeDisabled();

    const testString = "My Test String";
    const inputTextQuery = screen.getByTestId("signature-input");
    await userEvent.type(inputTextQuery, testString);
    expect(submitBtn).toBeEnabled();
  });

  it("should close the dialog after pressing done", async () => {
    render(
      <SignatureDialog setImage={() => {}}>
        <button>trigger</button>
      </SignatureDialog>
    );
    const trigger = screen.getByText(/trigger/);
    await userEvent.click(trigger);

    await userEvent.click(screen.getByText("Type"));
    // assert done is disabled
    const submitBtn = screen.getByText("Done");
    expect(submitBtn).toBeDisabled();

    const testString = "My Test String";
    const inputTextQuery = screen.getByTestId("signature-input");
    await userEvent.type(inputTextQuery, testString);
    expect(submitBtn).toBeEnabled();
    await userEvent.click(submitBtn);

    const dialogQuery = screen.queryByRole("dialog");
    expect(dialogQuery).toBeNull();
  });
});
