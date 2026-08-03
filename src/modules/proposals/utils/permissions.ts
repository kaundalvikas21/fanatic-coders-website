export type ProposalPermissions = Readonly<{
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  isManagementView: boolean;
  isClientView: boolean;
}>;
