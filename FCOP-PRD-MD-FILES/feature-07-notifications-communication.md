<!-- ======================================================================
  SOURCE FILE : fcop-prd-v1.md  (Fanatic Coders Operations Platform — PRD v1.0)
  THIS FILE   : Feature 07 — Notifications & Communication Layer
  PRD SECTION : 4.7 (Module 7)   |   PRD PAGES : 19-20   |   ORIGINAL LINES : 617-682
  RELATED     : Data model: Notification, NotificationPreference (see shared-02-data-model.md). Google Chat channel is implemented in feature-03-google-workspace-integration.md.
  INTEGRITY   : Everything below this comment is copied VERBATIM from the
                source PRD. No PRD content has been added, removed, or altered.
  ====================================================================== -->

Fanatic Coders Operations Platform — PRD v1.0
## Page 19
## 4.7 Module 7: Notifications & Communication Layer
Manages all internal and client-facing notifications across channels: in-app, email, and Google
## Chat.

## Feature Priority Description
In-app notification center P0 Bell icon with unread count. Notifications for: task assigned, task
status changed, comment/mention, update posted, deadline
approaching (24h), onboarding completed. Clicking navigates to
the relevant item.
Email notifications
## (internal)
P0 Immediate emails for: task assignment, @mention. Configurable
digest (daily/weekly) for: completed tasks, project status
changes. Team members can opt in/out per notification type.
Email notifications
## (client-facing)
P0 Triggered by: project update posted (client-visible), onboarding
invitation, onboarding reminder, invoice sent, invoice overdue
reminder.
Google Chat integration
(covered in Module 3)
P0 Task creation/assignment and status change notifications to
mapped Chat spaces.
Notification preferences P1 Per-user settings: toggle on/off for each notification type per
channel (in-app, email, Chat). Admin can set org-wide defaults.
Email delivery service P1 Use a transactional email provider for reliability.
Recommendation: Postmark (superior deliverability for
transactional email) or SendGrid (broader feature set). Must
support SPF/DKIM/DMARC for the fanaticcoders.com domain.
Webhook support for
external integrations
P2 Expose webhooks for key events (task created, project status
changed, invoice paid) so Admin can connect to Zapier or
custom integrations in the future.

## User Stories — Module 7
As a Team Member, I want to configure which notifications I receive and on which channels, so that I’m
not overwhelmed by irrelevant alerts but never miss critical ones.
## Acceptance Criteria:
– Settings page shows a matrix: notification type (rows) × channel (columns: in-app,
email, Chat)
– Each cell is a toggle (on/off)
– Defaults are set by Admin but overridable by the user (except mandatory
notifications like security alerts)

As a Client, I want to receive an email whenever there is an update on my project, so that I’m always
aware of progress without needing to log in.
## Acceptance Criteria:
– Email is sent within 2 minutes of a client-visible update being posted
– Email includes project name, update preview, and a button linking to the portal
– Client can unsubscribe from non-critical notifications (not invoices) via email
preferences link


Fanatic Coders Operations Platform — PRD v1.0
## Page 20
As a Admin, I want to set organization-wide default notification preferences, so that new team members
and clients start with sensible defaults.
## Acceptance Criteria:
– Admin settings page shows a default matrix identical to the user settings
– New accounts inherit admin defaults
– Admin can lock certain notifications as mandatory (cannot be turned off by users)


