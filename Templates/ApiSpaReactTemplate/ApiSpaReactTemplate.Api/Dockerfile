#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.
#build image from the SLN Directory 
#docker build . -t <NAME> -f ApiSpaReactTemplate.Api/Dockerfile

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
COPY ["ApiSpaReactTemplate.Api/ApiSpaReactTemplate.Api.csproj", "ApiSpaReactTemplate.Api/"]
COPY ["ApiSpaReactTemplate.Web", "ApiSpaReactTemplate.Web/"]

RUN dotnet restore "ApiSpaReactTemplate.Api/ApiSpaReactTemplate.Api.csproj"

WORKDIR "/src/ApiSpaReactTemplate.Api"
COPY . .
RUN dotnet build "ApiSpaReactTemplate.Api/ApiSpaReactTemplate.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ApiSpaReactTemplate.Api/ApiSpaReactTemplate.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ApiSpaReactTemplate.Api.dll"] 