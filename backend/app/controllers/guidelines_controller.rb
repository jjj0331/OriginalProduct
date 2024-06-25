class GuidelinesController < ApplicationController

  def create
    @guideline = Guideline.new(guideline_params)

    if @guideline.save
      render json: @guideline, status: :created
    else
      render json: { message: '保存に失敗しました', errors: @guideline.errors.full_messages }, status: :unprocessable_entity
    end
  end  
  
  private

  def guideline_params
    params.require(:guideline).permit(:title, :description, tasks_attributes: [
      :id, :title, :description, :_destroy, detail_tasks_attributes: [
        :id, :title, :description, :_destroy
      ]
    ])
  end
end
