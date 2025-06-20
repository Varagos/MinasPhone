type ContactRowProps = {
  icon: React.ReactNode;
  header: string;
  details: React.ReactNode;
};

const ContactRow = ({ icon, header, details }: ContactRowProps) => {
  return (
    <div className="py-2">
      <div className="flex items-center">
        <span className="text-inherit">{icon}</span>
        <span className="pl-2">
          <p className="text-base">{header}</p>
        </span>
      </div>
      <div className="border-l border-white pl-4 ml-1 mt-1">
        {details}
      </div>
    </div>
  );
};

export default ContactRow;
