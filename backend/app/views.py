from django.shortcuts import render

# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import User, Post
from .serializers import UserSerializer,PostSerializer
from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def index(request):
    return Response({"hi":"hi"})




@api_view(['POST'])
def register(request):
    data = request.data
    try:
        user = User.objects.create_user(username=data['username'],email=data['email'],password=data['password'])
        user.save()
    except: 
        content = "These cerdentails already exists"
        return Response(content, status = status.HTTP_409_CONFLICT)
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)



@permission_classes([IsAuthenticated])
@api_view(['GET','POST'])
def getPosts(request):
    
    if request.method == 'GET':
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        user = request.user
        data = request.data
        user.posts.create(user=user,description=data["description"], image=data["image"])
        post_serializer = PostSerializer(data=data)
        if post_serializer.is_valid():
            return Response(post_serializer.data,status = status.HTTP_201_CREATED)
        else:
            return Response(post_serializer.errors, status = status.HTTP_400_BAD_REQUEST)