
interface RememberMeCheckboxProps {
  id?: string;
}

const RememberMeCheckbox = ({ id = "remember" }: RememberMeCheckboxProps) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
      />
      <label htmlFor={id} className="text-sm text-muted-foreground">
        Remember me for 30 days
      </label>
    </div>
  );
};

export default RememberMeCheckbox;
