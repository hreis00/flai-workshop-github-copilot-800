from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime, timedelta
import random


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing data...')
        
        # Delete existing data using Django ORM
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        
        self.stdout.write(self.style.SUCCESS('Existing data cleared!'))
        
        # Create Teams
        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='Earth\'s Mightiest Heroes - Fighting for fitness!'
        )
        team_dc = Team.objects.create(
            name='Team DC',
            description='Justice League - Defending health and wellness!'
        )
        self.stdout.write(self.style.SUCCESS(f'Created {Team.objects.count()} teams'))
        
        # Create Marvel Heroes
        marvel_heroes = [
            {'name': 'Iron Man', 'email': 'tony.stark@marvel.com', 'password': 'ironman123'},
            {'name': 'Captain America', 'email': 'steve.rogers@marvel.com', 'password': 'cap123'},
            {'name': 'Thor', 'email': 'thor.odinson@marvel.com', 'password': 'thor123'},
            {'name': 'Black Widow', 'email': 'natasha.romanoff@marvel.com', 'password': 'widow123'},
            {'name': 'Hulk', 'email': 'bruce.banner@marvel.com', 'password': 'hulk123'},
            {'name': 'Spider-Man', 'email': 'peter.parker@marvel.com', 'password': 'spidey123'},
        ]
        
        # Create DC Heroes
        dc_heroes = [
            {'name': 'Superman', 'email': 'clark.kent@dc.com', 'password': 'superman123'},
            {'name': 'Batman', 'email': 'bruce.wayne@dc.com', 'password': 'batman123'},
            {'name': 'Wonder Woman', 'email': 'diana.prince@dc.com', 'password': 'wonder123'},
            {'name': 'Flash', 'email': 'barry.allen@dc.com', 'password': 'flash123'},
            {'name': 'Aquaman', 'email': 'arthur.curry@dc.com', 'password': 'aquaman123'},
            {'name': 'Green Lantern', 'email': 'hal.jordan@dc.com', 'password': 'lantern123'},
        ]
        
        # Create Users
        self.stdout.write('Creating users...')
        marvel_users = []
        for hero in marvel_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                password=hero['password'],
                team_id=str(team_marvel.id)
            )
            marvel_users.append(user)
        
        dc_users = []
        for hero in dc_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                password=hero['password'],
                team_id=str(team_dc.id)
            )
            dc_users.append(user)
        
        all_users = marvel_users + dc_users
        self.stdout.write(self.style.SUCCESS(f'Created {User.objects.count()} users'))
        
        # Create Workouts
        self.stdout.write('Creating workouts...')
        workouts_data = [
            {
                'name': 'Super Soldier Training',
                'description': 'Intense full-body workout inspired by Captain America',
                'activity_type': 'Strength Training',
                'difficulty': 'Hard',
                'duration': 60,
                'calories_per_session': 500
            },
            {
                'name': 'Web-Slinger Cardio',
                'description': 'High-intensity cardio workout like Spider-Man',
                'activity_type': 'Running',
                'difficulty': 'Medium',
                'duration': 45,
                'calories_per_session': 400
            },
            {
                'name': 'Asgardian Hammer Lift',
                'description': 'Heavy lifting workout worthy of Thor',
                'activity_type': 'Weight Lifting',
                'difficulty': 'Hard',
                'duration': 50,
                'calories_per_session': 450
            },
            {
                'name': 'Speed Force Sprint',
                'description': 'Lightning-fast interval running workout',
                'activity_type': 'Running',
                'difficulty': 'Hard',
                'duration': 30,
                'calories_per_session': 350
            },
            {
                'name': 'Atlantean Swim',
                'description': 'Endurance swimming workout like Aquaman',
                'activity_type': 'Swimming',
                'difficulty': 'Medium',
                'duration': 40,
                'calories_per_session': 380
            },
            {
                'name': 'Bat-Cave Circuit',
                'description': 'Full-body circuit training in the dark',
                'activity_type': 'Circuit Training',
                'difficulty': 'Hard',
                'duration': 55,
                'calories_per_session': 480
            },
            {
                'name': 'Amazon Warrior Yoga',
                'description': 'Flexibility and strength yoga session',
                'activity_type': 'Yoga',
                'difficulty': 'Easy',
                'duration': 35,
                'calories_per_session': 200
            },
            {
                'name': 'Gamma Rage HIIT',
                'description': 'High-intensity interval training for explosive power',
                'activity_type': 'HIIT',
                'difficulty': 'Hard',
                'duration': 40,
                'calories_per_session': 420
            },
        ]
        
        for workout_data in workouts_data:
            Workout.objects.create(**workout_data)
        
        self.stdout.write(self.style.SUCCESS(f'Created {Workout.objects.count()} workouts'))
        
        # Create Activities
        self.stdout.write('Creating activities...')
        activity_types = ['Running', 'Swimming', 'Cycling', 'Weight Lifting', 'Yoga', 'HIIT', 'Circuit Training']
        
        for user in all_users:
            # Create 5-10 activities per user
            num_activities = random.randint(5, 10)
            for i in range(num_activities):
                activity_type = random.choice(activity_types)
                duration = random.randint(20, 90)
                distance = random.uniform(2, 15) if activity_type in ['Running', 'Swimming', 'Cycling'] else None
                calories = duration * random.randint(6, 12)
                
                # Create activities from the past 30 days
                days_ago = random.randint(0, 30)
                activity_date = datetime.now() - timedelta(days=days_ago)
                
                Activity.objects.create(
                    user_id=str(user.id),
                    activity_type=activity_type,
                    duration=duration,
                    distance=distance,
                    calories=calories,
                    date=activity_date
                )
        
        self.stdout.write(self.style.SUCCESS(f'Created {Activity.objects.count()} activities'))
        
        # Create Leaderboard entries
        self.stdout.write('Creating leaderboard entries...')
        for user in all_users:
            # Calculate totals from activities
            user_activities = Activity.objects.filter(user_id=str(user.id))
            total_calories = sum(activity.calories for activity in user_activities)
            total_activities = user_activities.count()
            total_duration = sum(activity.duration for activity in user_activities)
            
            Leaderboard.objects.create(
                user_id=str(user.id),
                team_id=user.team_id,
                total_calories=total_calories,
                total_activities=total_activities,
                total_duration=total_duration,
                rank=0  # Will be updated based on sorting
            )
        
        # Update ranks based on total calories
        leaderboard_entries = Leaderboard.objects.all().order_by('-total_calories')
        for rank, entry in enumerate(leaderboard_entries, start=1):
            entry.rank = rank
            entry.save()
        
        self.stdout.write(self.style.SUCCESS(f'Created {Leaderboard.objects.count()} leaderboard entries'))
        
        # Display summary
        self.stdout.write(self.style.SUCCESS('\n=== Database Population Complete ==='))
        self.stdout.write(f'Teams: {Team.objects.count()}')
        self.stdout.write(f'Users: {User.objects.count()}')
        self.stdout.write(f'Activities: {Activity.objects.count()}')
        self.stdout.write(f'Workouts: {Workout.objects.count()}')
        self.stdout.write(f'Leaderboard Entries: {Leaderboard.objects.count()}')
        
        # Display top 3 leaderboard
        self.stdout.write(self.style.SUCCESS('\n=== Top 3 Leaderboard ==='))
        top_three = Leaderboard.objects.all().order_by('rank')[:3]
        for entry in top_three:
            user = User.objects.get(id=entry.user_id)
            self.stdout.write(f'Rank {entry.rank}: {user.name} - {entry.total_calories} calories')
