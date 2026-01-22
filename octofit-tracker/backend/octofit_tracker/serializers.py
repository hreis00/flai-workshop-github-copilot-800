from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout


class UserSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'team_id', 'created_at']
        extra_kwargs = {'password': {'write_only': True}}
    
    def get_id(self, obj):
        return str(obj.pk)


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    member_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'member_count', 'created_at']
    
    def get_id(self, obj):
        return str(obj.pk)
    
    def get_member_count(self, obj):
        # Count users that belong to this team
        return User.objects.filter(team_id=str(obj.pk)).count()


class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    
    class Meta:
        model = Activity
        fields = ['id', 'user_id', 'activity_type', 'duration', 'distance', 'calories', 'date', 'created_at']
    
    def get_id(self, obj):
        return str(obj.pk)


class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()
    team = serializers.SerializerMethodField()
    
    class Meta:
        model = Leaderboard
        fields = ['id', 'user_id', 'user', 'team_id', 'team', 'total_calories', 'total_activities', 'total_duration', 'rank', 'updated_at']
    
    def get_id(self, obj):
        return str(obj.pk)
    
    def get_user(self, obj):
        try:
            user = User.objects.get(pk=obj.user_id)
            return user.name
        except User.DoesNotExist:
            return "Unknown User"
    
    def get_team(self, obj):
        try:
            team = Team.objects.get(pk=obj.team_id)
            return team.name
        except (Team.DoesNotExist, ValueError):
            return None


class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    
    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'activity_type', 'difficulty', 'duration', 'calories_per_session', 'created_at']
    
    def get_id(self, obj):
        return str(obj.pk)
