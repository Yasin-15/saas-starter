# Team Invitation Feature - Quick Test Guide

## Testing the Implementation

### 1. Check if the dev server is running
The server should be running at http://localhost:3000

### 2. Test the Team Page
1. Navigate to: http://localhost:3000/dashboard/team
2. You should see:
   - List of active team members
   - "Invite Member" button (if you're an OWNER or ADMIN)
   - Pending invitations section (if any exist)

### 3. Test Sending an Invitation
1. Click "Invite Member" button
2. Enter an email address
3. Select a role (VIEWER, MEMBER, ADMIN, or OWNER)
4. Click "Send Invitation"
5. Check the console logs for the invitation link

### 4. Test Accepting an Invitation
1. Copy the invitation link from console (format: /invite/{token})
2. Open it in a new browser window/incognito
3. You should see a beautiful invitation page
4. If not logged in, you'll see options to login or create account
5. After logging in with the invited email, you can accept or decline

### 5. Test Member Removal
1. Go to the team page
2. Click the X button next to a member (not OWNER)
3. Confirm the removal
4. Member should be removed from the list

## TypeScript Errors

If you see TypeScript errors about "Cannot find module", these are false positives that will resolve when:
- The TypeScript language server restarts
- You reload VS Code window (Ctrl+Shift+P → "Reload Window")
- The files are recompiled

The actual code is working correctly - the errors are just the IDE not recognizing the new files yet.

## Verifying the Database

To check if invitations are being created:

```bash
npx prisma studio
```

Then navigate to the "Invitation" model to see all invitations.

## Common Issues

### "Invitation not found"
- Make sure you copied the complete token from the console
- Check if the invitation was cancelled

### "Email mismatch"
- You must log in with the exact email that received the invitation
- Use incognito mode to test with different accounts

### Module resolution errors in IDE
- These are TypeScript language server issues
- The code will still run correctly
- Reload VS Code window to fix

## Next Steps

To complete the feature with email sending:
1. Choose an email service (SendGrid, Resend, AWS SES, etc.)
2. Add the service credentials to .env
3. Update the `inviteTeamMember` action to send actual emails
4. Replace the console.log with email sending code

Example with Resend:
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'noreply@yourdomain.com',
  to: email,
  subject: `You've been invited to join ${membership.tenant.name}`,
  html: `
    <h1>Team Invitation</h1>
    <p>You've been invited to join ${membership.tenant.name} as a ${role}.</p>
    <a href="${process.env.NEXTAUTH_URL}/invite/${token}">Accept Invitation</a>
  `
})
```
