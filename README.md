# React A4 Page Maker

The React A4 Page Maker is a versatile tool designed for developers
who need to create printable documents directly within their React
applications. Whether you are generating invoices, reports, or
certificates, this library simplifies the process of formatting
content to fit A4 page dimensions.

## 📦 Installation

Install the package with npm:

```bash
npm install react-a4page-maker@latest
```

## 🔨 Usage

The `A4ContentProvider` component allows you to wrap your content, automatically handling the A4 formatting for you.

### Example

```typescript
import React from "react";
import A4ContentProvider from "react-a4page-maker";

const Documents: React.FC = () => {
  return (
    <A4ContentProvider config={{ printable: true, removeFooter: true }}>
      <h1>Welcome to React A4 Page Maker</h1>
      <p>
        The React A4 Page Maker is a versatile tool designed for developers who
        need to create printable documents directly within their React
        applications. Whether you are generating invoices, reports, or
        certificates, this library simplifies the process of formatting content
        to fit A4 page dimensions.
      </p>
    </A4ContentProvider>
  );
};

export default Documents;
```

## Props

The `A4ContentProvider` component accepts the following props:

| Prop                  | Type      | Required | Default | Description                                            |
| --------------------- | --------- | -------- | ------- | ------------------------------------------------------ |
| `config.printable`    | `boolean` | No       | `true`  | Determines if the content should be printable.         |
| `config.removeFooter` | `boolean` | No       | `false` | If true, removes the footer from the printed document. |

## Summary

The React A4 Page Maker provides an easy-to-use `A4ContentProvider` component that automatically handles A4 formatting for any content you wish to print. With customizable props like `printable` and `removeFooter`, you have the flexibility to control the print layout according to your needs. This library is an essential tool for any React application that requires document generation and printing capabilities.

## Preview

![mehedi_hasan_banner](https://i.ibb.co.com/s9JsmxP/react-a4page-maker-preview.png)
