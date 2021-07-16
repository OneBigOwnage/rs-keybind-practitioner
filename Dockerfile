FROM node:16.5

RUN npm install -g @angular/cli

RUN usermod -u 1001 node

ARG USER

RUN useradd -G www-data,root -u 1000 -d /home/$USER $USER
RUN mkdir -p /home/$USER/.composer && \
    chown -R $USER:$USER /home/$USER

USER $USER


ENTRYPOINT [ "tail", "-f", "/dev/null" ]
