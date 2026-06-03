<!-- ======================================================================
  SOURCE FILE : fcop-prd-v1.md  (Fanatic Coders Operations Platform — PRD v1.0)
  THIS FILE   : Feature 03 — Google Workspace Integration
  PRD SECTION : 4.3 (Module 3)   |   PRD PAGES : 9-10   |   ORIGINAL LINES : 236-316
  RELATED     : Data model: Project.chat_space_id, Task, Notification. Tightly related to feature-07-notifications-communication.md. Requires Workspace admin approval (see ref-02-open-questions.md OQ-4).
  INTEGRITY   : Everything below this comment is copied VERBATIM from the
                source PRD. No PRD content has been added, removed, or altered.
  ====================================================================== -->

Fanatic Coders Operations Platform — PRD v1.0
## Page 9
## 4.3 Module 3: Google Workspace Integration
Connects FCOP to Google Chat and Google Calendar to keep the team informed in real time
without requiring them to constantly check the platform.

## Feature Priority Description
Google Chat task
notification
P0 When a task is created or reassigned, automatically post a card-
style message to a designated Google Chat space. Card
includes: task title, assignee, deadline, priority badge, and a
deep-link button back to the task in FCOP.
Google Chat space
mapping
P0 Admin can map each project (or service team) to a specific
Google Chat space. Notifications for that project go to the
mapped space.
Google Calendar event
creation
P1 Optionally create a Google Calendar event for tasks with
deadlines. Event title = task title; event date = due date;
description includes task link.
Status change
notifications
P1 Post an update to Google Chat when a task moves to In Review
or Done.
Daily digest to Chat P2 Configurable daily summary posted to a Chat space: tasks due
today, overdue tasks, tasks completed yesterday.

## Integration Architecture
Authentication: The platform registers as a Google Chat App using a service account. This
allows it to post messages to Chat spaces without per-user OAuth consent for each notification.

Required OAuth 2.0 Scopes:
- https://www.googleapis.com/auth/chat.bot — Send messages as the Chat app (primary
scope for notifications)
- https://www.googleapis.com/auth/chat.spaces.readonly — List available spaces for the
mapping UI
- https://www.googleapis.com/auth/calendar.events — Create/update Calendar events
(user-delegated, requires one-time consent from the calendar owner)

API Endpoints Used:
- POST https://chat.googleapis.com/v1/spaces/{space}/messages — Create a message in
a Chat space
- GET https://chat.googleapis.com/v1/spaces — List spaces the app has access to
- POST https://www.googleapis.com/calendar/v3/calendars/{calendarId}/events — Create
a Calendar event

Constraints (from Google Chat API documentation):
- The Chat app must be added to a space before it can post messages to that space
- Messages created via app authentication display the app name as sender (not a user)
- Message size limit: 32,000 bytes per message

Fanatic Coders Operations Platform — PRD v1.0
## Page 10
- App-specific OAuth scopes (chat.app.*) require one-time Workspace admin approval

## User Stories — Module 3
As a Team Member, I want to receive a Google Chat notification when a task is assigned to me, so that I
don’t need to check the platform constantly to know I have new work.
## Acceptance Criteria:
– Notification appears in the mapped Chat space within 5 seconds of task creation
– Card shows: task title, my name, due date, priority, and a clickable link to the task
– If the Chat space is not mapped, the system logs a warning and does not silently fail

As a Admin, I want to map each project to a Google Chat space, so that notifications for that project go to
the right team channel.
## Acceptance Criteria:
– Admin sees a dropdown of available Chat spaces (fetched via spaces.list)
– Each project can be mapped to exactly one space
– Mapping can be changed at any time; change takes effect immediately

As a Manager, I want to receive a daily digest of overdue tasks in my team’s Chat space, so that I can
take action on blockers first thing in the morning.
## Acceptance Criteria:
– Digest is posted at a configurable time (default: 9:00 AM in the team’s timezone)
– Lists: tasks overdue, tasks due today, tasks completed yesterday
– Each item links to the task in FCOP


