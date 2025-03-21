
interface UserTypeSelectorProps {
  userType: 'student' | 'staff';
  setUserType: (type: 'student' | 'staff') => void;
}

const UserTypeSelector = ({ userType, setUserType }: UserTypeSelectorProps) => {
  return (
    <div className="bg-background border rounded-lg flex p-1">
      <button
        type="button"
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
          userType === 'student'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        onClick={() => setUserType('student')}
      >
        Student
      </button>
      <button
        type="button"
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
          userType === 'staff'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        onClick={() => setUserType('staff')}
      >
        Staff
      </button>
    </div>
  );
};

export default UserTypeSelector;
