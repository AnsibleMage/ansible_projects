require 'rails_helper'

RSpec.describe "Block 1: MistEngine", type: :system do
  before do
    # require 'capybara/cuprite'
    driven_by(:selenium_chrome_headless)
  end

  it "initializes the canvas and particle engine" do
    visit root_path

    # Task 1: Canvas Setup
    expect(page).to have_css("canvas[data-mist-target='canvas']"), "Canvas element should exist"
    
    # Wait for Stimulus to be available
    page.execute_script("
      const waitForStimulus = () => {
        if (window.Stimulus) return;
        setTimeout(waitForStimulus, 50);
      };
      waitForStimulus();
    ")
    sleep 1 # Wait for async JS

    # Task 2 & 3: Particle System Checks via JS Bridge
    particle_count = page.evaluate_script(<<~JS)
      (() => {
        if (!window.Stimulus) return -1;
        const el = document.querySelector('[data-controller="mist"]');
        return window.Stimulus.getControllerForElementAndIdentifier(el, 'mist').particles.length;
      })()
    JS
    expect(particle_count).to eq(1000), "Should initialize exactly 1000 particles"
  end

  it "updates time state correctly" do
    visit root_path
    
    page.execute_script("
      const waitForStimulus = () => {
        if (window.Stimulus) return;
        setTimeout(waitForStimulus, 50);
      };
      waitForStimulus();
    ")
    sleep 1
    
    # Task 3: Time Mapper State
    time_state = page.evaluate_script(<<~JS)
        (() => {
            if (!window.Stimulus) return "NOT_LOADED";
            const el = document.querySelector('[data-controller="mist"]');
            return window.Stimulus.getControllerForElementAndIdentifier(el, 'mist').timeState;
        })()
    JS
    valid_states = ['DAWN', 'DAY', 'DUSK', 'VOID']
    expect(valid_states).to include(time_state), "Time state should be one of #{valid_states}"
  end
end
