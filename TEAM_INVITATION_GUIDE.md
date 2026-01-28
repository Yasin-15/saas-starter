# Team Invitation Feature Guide

## Overview

The team invitation system allows organization owners and admins to invite new members to their team via email. Invitations are sent with unique tokens and expire after 7 days.

## Features

### 1. **Invite Team Members**
- Only **OWNER** and **ADMIN** roles can invite members
- Invitations are sent via email with a unique link
- Each invitation includes:
  - Recipient's email address
  - Assigned role (VIEWER, MEMBER, ADMIN, or OWNER)
  - Unique token for security
  - 7-day expiration period

### 2. **Role-Based Permissions**

| Role | Can Invite | Can Remove | Can Assign Roles |
|------|-----------|------------|------------------|
| **OWNER** | ✅ Yes | ✅ All except last owner | ✅ All roles |
| **ADMIN** | ✅ Yes | ✅ Members & Viewers only | ✅ Member, Viewer |
| **MEMBER** | ❌ No | ❌ No | ❌ No |
| **VIEWER** | ❌ No | ❌ No | ❌ No |

### 3. **Invitation States**

- **PENDING** - Invitation sent, awaiting response
- **ACCEPTED** - User accepted and joined the team
- **REJECTED** - User declined the invitation
- **EXPIRED** - Invitation expired after 7 days

## How to Use

### Inviting a Team Member

1. Navigate to **Dashboard → Team**
2. Click the **"Invite Member"** button (top right)
3. Enter the email address of the person you want to invite
4. Select their role:
   - **Viewer** - Read-only access
   - **Member** - Standard access
   - **Admin** - Full access except billing
   - **Owner** - Full access (only available to current owners)
5. Click **"Send Invitation"**

The invitation link will be logged to the console (in production, this should send an email).

### Accepting an Invitation

When a user receives an invitation:

1. They click the invitation link: `/invite/{token}`
2. If not logged in, they can:
   - Log in with the invited email
   - Create a new account with the invited email
3. Once logged in with the correct email, they can:
   - **Accept** - Join the team with the assigned role
   - **Decline** - Reject the invitation

### Managing Invitations

**View Pending Invitations:**
- Go to **Dashboard → Team**
- Scroll to the "Pending Invitations" section
- See all pending, accepted, rejected, and expired invitations

**Cancel an Invitation:**
- Click the ❌ button next to a pending invitation
- Confirm the cancellation

### Removing Team Members

1. Go to **Dashboard → Team**
2. Find the member you want to remove
3. Click the ❌ button in the Actions column
4. Confirm the removal

**Restrictions:**
- Cannot remove the last OWNER
- ADMINs cannot remove OWNERs or other ADMINs
- Only OWNERs and ADMINs can remove members

## API Endpoints

### Invite a Member
```typescript
POST /api/team/invite
Content-Type: multipart/form-data

{
  email: "user@example.com",
  role: "MEMBER"
}
```

### Accept Invitation
```typescript
POST /api/team/accept-invitation
Content-Type: application/json

{
  token: "invitation-token-here"
}
```

### Reject Invitation
```typescript
POST /api/team/reject-invitation
Content-Type: application/json

{
  token: "invitation-token-here"
}
```

### Cancel Invitation
```typescript
POST /api/team/cancel-invitation
Content-Type: application/json

{
  invitationId: "invitation-id-here"
}
```

### Remove Member
```typescript
POST /api/team/remove-member
Content-Type: application/json

{
  memberId: "member-id-here"
}
```

## Database Schema

### Invitation Model

```prisma
model Invitation {
  id        String           @id @default(cuid())
  tenantId  String
  email     String
  role      Role             @default(MEMBER)
  status    InvitationStatus @default(PENDING)
  token     String           @unique
  expiresAt DateTime
  invitedBy String?

  tenant Tenant @relation(fields: [tenantId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([tenantId, email])
  @@index([tenantId])
  @@index([token])
}

enum InvitationStatus {
  PENDING
  ACCEPTED
  REJECTED
  EXPIRED
}
```

## Security Features

1. **Unique Tokens** - Each invitation has a unique, non-guessable token
2. **Email Verification** - Invitations can only be accepted by the invited email
3. **Expiration** - Invitations automatically expire after 7 days
4. **Permission Checks** - All actions verify user permissions
5. **Duplicate Prevention** - Cannot invite existing members or send duplicate invitations

## Future Enhancements

- [ ] Email notifications (currently logs to console)
- [ ] Resend invitation functionality
- [ ] Bulk invitations
- [ ] Custom invitation messages
- [ ] Invitation analytics
- [ ] Configurable expiration periods

## Troubleshooting

### "Invitation not found"
- The invitation may have been cancelled or deleted
- Check if the token in the URL is complete

### "Invitation has expired"
- Request a new invitation from the team admin
- Invitations expire after 7 days

### "This invitation was sent to a different email"
- Log out and log in with the email address that received the invitation
- Or create a new account with that email

### "User is already a member"
- The user has already joined the team
- No action needed

### "You don't have permission"
- Only OWNERs and ADMINs can invite members
- Contact your organization owner for assistance

## Best Practices

1. **Assign Appropriate Roles** - Give users the minimum permissions they need
2. **Monitor Pending Invitations** - Regularly review and clean up old invitations
3. **Verify Email Addresses** - Double-check email addresses before sending invitations
4. **Use Viewer Role** - For external stakeholders who only need read access
5. **Maintain at Least One Owner** - Ensure there's always at least one owner in the organization

---

**Need Help?** Contact support or open an issue in the repository.
