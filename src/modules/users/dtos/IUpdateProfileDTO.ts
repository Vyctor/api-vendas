interface IUpdateProfileDTO {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

export default IUpdateProfileDTO;
