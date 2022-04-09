#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.
#build image from the SLN Directory 
#docker build . -t <NAME> -f ApiSpaAngularTemplate.Api/Dockerfile

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

WORKDIR /src
COPY ["ApiSpaAngularTemplate.Api/ApiSpaAngularTemplate.Api.csproj", "ApiSpaAngularTemplate.Api/"]
COPY ["ApiSpaAngularTemplate.Web", "ApiSpaAngularTemplate.Web/"]

RUN dotnet restore "ApiSpaAngularTemplate.Api/ApiSpaAngularTemplate.Api.csproj"

WORKDIR "/src/ApiSpaAngularTemplate.Api"
COPY . .
RUN dotnet build "ApiSpaAngularTemplate.Api/ApiSpaAngularTemplate.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ApiSpaAngularTemplate.Api/ApiSpaAngularTemplate.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ApiSpaAngularTemplate.Api.dll"] 