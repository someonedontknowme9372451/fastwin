 ### BottomDialog React Component

The `BottomDialog` component is a reusable React component that displays a bottom dialog with various options for the user to choose from. It takes two props: `value` and `isDialog`. The `value` prop determines the content of the dialog, and the `isDialog` prop controls whether the dialog is visible or not.

#### Installation

To use the `BottomDialog` component, you must first install it from npm:

```bash
npm install bottom-dialog
```

Once installed, you can import the component into your React application:

```javascript
import BottomDialog from 'bottom-dialog';
```

#### Usage

The `BottomDialog` component can be used by passing the `value` and `isDialog` props to it. The `value` prop can be any string, and it will determine the content of the dialog. The `isDialog` prop should be a boolean value, and it will control whether the dialog is visible or not.

Here is an example of how to use the `BottomDialog` component:

```javascript
const MyComponent = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenDialog}>Open Dialog</button>

      {isDialogOpen && <BottomDialog value="My Dialog Content" isDialog={handleCloseDialog} />}
    </div>
  );
};
```

In this example, the `BottomDialog` component is used to display a dialog with the content "My Dialog Content". The dialog is opened when the user clicks the "Open Dialog" button, and it is closed when the user clicks the "Close Dialog" button.

#### Props

The `BottomDialog` component accepts the following props:

* `value`: The content of the dialog. Can be any string.
* `isDialog`: A boolean value that controls whether the dialog is visible or not.

#### Styling

The `BottomDialog` component can be styled using CSS. The following CSS rules can be used to style the component:

```css
.bottom-dialog {
  position: fixed;
  bottom: 0;
  left: 0
}