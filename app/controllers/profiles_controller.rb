class ProfilesController < ApplicationController
    
    # GET to /users/:user_id/profile/new
    
    def new
      # Render blank profile details form 
      @profile = Profile.new
    end
    
    # POST to /users/:user_id/profile/new
    def create
      @user = User.find( params[:user_id] )
      @profile = @user.build_profile( profile_params )
      if @profile.save
        flash[:success] = "Profile updated!"
        redirect_to user_path( params[:user_id])
      else 
        render action: :new
      end
    end
    
    # GET to users/:user_id/profile/edit 
    def edit
      @user = User.find( params[:user_id] )
      @profile = @user.profile
    end
    
    # PUT to /users/:user_id/profile
    def update
      # Retrieve the user from database
      @user = User.find( params[:user_id] )
      # Retrieve that user's profile
      @profile = @user.profile
      # Mass asignedited profile attributes and save (update)
      if @profile.update_attributes(profile_params)
        flash[:success] = "Profile updated!"
        # Redirect user to their profile page
        redirect_to user_path(id: params[:user_id] )
      else
        render action: :edit
      end
    end
    
    private
      def profile_params
        params.require(:profile).permit(:first_name, :last_name, :avatar, :job_title, :phone_number, :contact_email, :description)
      end
end