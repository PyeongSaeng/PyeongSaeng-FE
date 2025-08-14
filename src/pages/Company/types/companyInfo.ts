// 회사 정보 조회
export type CompanyInfo = {
  companyId: number;
  username: string;
  businessNo: string;
  companyName: string;
  ownerName: string;
  email: string | null;
  phone: string;
  status: string;
};

export type UpdateCompanyInfo = {
  companyName?: string;
  ownerName?: string;
  phone?: string;
  currentPassword?: string;
  newPassword?: string;
  passwordChangeRequested?: boolean;
};
