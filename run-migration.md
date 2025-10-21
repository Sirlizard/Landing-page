# Database Migration Instructions

## Apply the Tracking ID Migration

To apply the database changes for tracking functionality, run the following command in your project directory:

```bash
# If using Supabase CLI
supabase db push

# Or if using Supabase Dashboard
# Go to your Supabase project dashboard > SQL Editor
# Copy and paste the contents of: supabase/migrations/20250101000000_add_tracking_id.sql
# Execute the SQL
```

## What the Migration Does

1. **Adds `tracking_id` column** to the `waitlist_emails` table
2. **Sets default value** to 'A' for all existing records
3. **Creates indexes** for faster queries by tracking ID
4. **Maintains backward compatibility**

## Testing the Migration

After running the migration, you can test it by:

1. **Sign up a new user** - should be tracked with ID 'A'
2. **Join the waitlist** - should be tracked with ID 'A'
3. **Check the database** - verify the `tracking_id` field is populated

## New Database Functions Available

- `getWaitlistCountByTracking(trackingId)` - Get count by tracking ID
- `getWaitlistByTracking(trackingId)` - Get all entries by tracking ID

## Database Schema After Migration

```sql
waitlist_emails:
- id (uuid, primary key)
- email (text, unique)
- source (text)
- tracking_id (text, default 'A') -- NEW FIELD
- created_at (timestamptz)
```

## Indexes Created

- `idx_waitlist_emails_tracking_id` - For fast tracking ID queries
- `idx_waitlist_emails_source_tracking` - For combined source + tracking queries
