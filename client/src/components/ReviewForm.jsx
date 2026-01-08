import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, ArrowLeft } from 'lucide-react';

const ReviewForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orientation: { sitQuietly: false, noticeMood: false, acknowledge: false },
    attentionAudit: {
      categories: { work: false, relationships: false, distraction: false, worry: false, health: false, rest: false },
      reflection: { wellSpent: '', wasted: '', patterns: '' }
    },
    emotionalReview: {
      emotions: { anger: false, anxiety: false, shame: false, contentment: false, boredom: false },
      reflection: { prolonged: '', narrative: '', noticeEarly: '' }
    },
    controlCheck: { situations: [{ text: '', withinControl: null, actedAsIf: null, neglected: '' }] },
    speechAction: {
      actions: { speakSilence: false, silentHonesty: false, impulse: false, avoidDiscomfort: false },
      reflection: { moment: '', betterResponse: '', cue: '' }
    },
    selfEgo: { behavior: '', validation: '', compassion: '', improved: '' },
    gratitudeMortality: { takenForGranted: '', ordinaryMoment: '', different: '', stopPostponing: '' },
    correction: { trigger: '', action: '' },
    closing: { breath: false, drop: false, begin: false }
  });

  const handleCheckbox = (section, field, subfield = null) => {
    setFormData(prev => {
      if (subfield) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: { ...prev[section][field], [subfield]: !prev[section][field][subfield] }
          }
        };
      }
      return {
        ...prev,
        [section]: { ...prev[section], [field]: !prev[section][field] }
      };
    });
  };

  const handleText = (section, field, value, subfield = null) => {
    setFormData(prev => {
      if (subfield) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: { ...prev[section][field], [subfield]: value }
          }
        };
      }
      return {
        ...prev,
        [section]: { ...prev[section], [field]: value }
      };
    });
  };

  const saveReview = () => {
    fetch('http://localhost:3001/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: new Date().toISOString(),
        answers: formData
      })
    })
    .then(res => res.json())
    .then(() => navigate('/'))
    .catch(err => console.error('Error saving:', err));
  };

  const Section = ({ title, children, quote }) => (
    <div className="bg-white border border-stone-200 rounded-lg p-8 mb-8 shadow-sm">
      <h3 className="text-xl font-bold mb-4 border-b border-stone-100 pb-2">{title}</h3>
      {quote && <p className="italic text-stone-500 mb-6 text-sm">“{quote}”</p>}
      {children}
    </div>
  );

  const Checkbox = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-3 mb-3 cursor-pointer group">
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange}
        className="w-5 h-5 accent-stone-800 rounded border-stone-300" 
      />
      <span className="text-stone-700 group-hover:text-stone-900 transition-colors">{label}</span>
    </label>
  );

  const TextArea = ({ label, value, onChange, placeholder }) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-stone-600 mb-1">{label}</label>
      <textarea 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 border border-stone-200 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-500 min-h-[100px] font-serif"
      />
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors">
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
        <button 
          onClick={saveReview}
          className="flex items-center gap-2 bg-stone-800 text-white px-6 py-2 rounded-md hover:bg-stone-700 transition-colors shadow-lg"
        >
          <Save size={18} /> Finish & Save
        </button>
      </div>

      <header className="mb-12 text-center">
        <h2 className="text-4xl font-serif mb-2">Weekly Stoic Review</h2>
        <p className="text-stone-500 italic">“Waste no more time arguing what a good person should be. Be one.” — Marcus Aurelius</p>
      </header>

      {/* 1. Orientation */}
      <Section title="1. Orientation">
        <Checkbox label="Sit quietly for 3–5 breaths" checked={formData.orientation.sitQuietly} onChange={() => handleCheckbox('orientation', 'sitQuietly')} />
        <Checkbox label="Notice current mood without analysis" checked={formData.orientation.noticeMood} onChange={() => handleCheckbox('orientation', 'noticeMood')} />
        <Checkbox label="Acknowledge: “This review is for correction, not judgment.”" checked={formData.orientation.acknowledge} onChange={() => handleCheckbox('orientation', 'acknowledge')} />
      </Section>

      {/* 2. Attention Audit */}
      <Section title="2. Attention Audit">
        <p className="text-sm font-semibold mb-3">Where did my attention actually go this week?</p>
        <div className="grid grid-cols-2 mb-6">
          <Checkbox label="Work / study" checked={formData.attentionAudit.categories.work} onChange={() => handleCheckbox('attentionAudit', 'categories', 'work')} />
          <Checkbox label="Relationships" checked={formData.attentionAudit.categories.relationships} onChange={() => handleCheckbox('attentionAudit', 'categories', 'relationships')} />
          <Checkbox label="Distraction" checked={formData.attentionAudit.categories.distraction} onChange={() => handleCheckbox('attentionAudit', 'categories', 'distraction')} />
          <Checkbox label="Worry / rumination" checked={formData.attentionAudit.categories.worry} onChange={() => handleCheckbox('attentionAudit', 'categories', 'worry')} />
          <Checkbox label="Health" checked={formData.attentionAudit.categories.health} onChange={() => handleCheckbox('attentionAudit', 'categories', 'health')} />
          <Checkbox label="Rest" checked={formData.attentionAudit.categories.rest} onChange={() => handleCheckbox('attentionAudit', 'categories', 'rest')} />
        </div>
        <TextArea label="Where was attention well spent?" value={formData.attentionAudit.reflection.wellSpent} onChange={(v) => handleText('attentionAudit', 'reflection', v, 'wellSpent')} />
        <TextArea label="Where was it wasted?" value={formData.attentionAudit.reflection.wasted} onChange={(v) => handleText('attentionAudit', 'reflection', v, 'wasted')} />
        <TextArea label="What patterns repeat?" value={formData.attentionAudit.reflection.patterns} onChange={(v) => handleText('attentionAudit', 'reflection', v, 'patterns')} />
      </Section>

      {/* 3. Emotional Review */}
      <Section title="3. Emotional Review">
        <p className="text-sm font-semibold mb-3">What emotions dominated?</p>
        <div className="grid grid-cols-2 mb-6">
          <Checkbox label="Anger / irritation" checked={formData.emotionalReview.emotions.anger} onChange={() => handleCheckbox('emotionalReview', 'emotions', 'anger')} />
          <Checkbox label="Anxiety / worry" checked={formData.emotionalReview.emotions.anxiety} onChange={() => handleCheckbox('emotionalReview', 'emotions', 'anxiety')} />
          <Checkbox label="Shame / regret" checked={formData.emotionalReview.emotions.shame} onChange={() => handleCheckbox('emotionalReview', 'emotions', 'shame')} />
          <Checkbox label="Contentment / gratitude" checked={formData.emotionalReview.emotions.contentment} onChange={() => handleCheckbox('emotionalReview', 'emotions', 'contentment')} />
          <Checkbox label="Boredom / restlessness" checked={formData.emotionalReview.emotions.boredom} onChange={() => handleCheckbox('emotionalReview', 'emotions', 'boredom')} />
        </div>
        <TextArea label="Which emotions were prolonged unnecessarily?" value={formData.emotionalReview.reflection.prolonged} onChange={(v) => handleText('emotionalReview', 'reflection', v, 'prolonged')} />
        <TextArea label="Where did narrative extend emotion?" value={formData.emotionalReview.reflection.narrative} onChange={(v) => handleText('emotionalReview', 'reflection', v, 'narrative')} />
        <TextArea label="Did I notice emotions early?" value={formData.emotionalReview.reflection.noticeEarly} onChange={(v) => handleText('emotionalReview', 'reflection', v, 'noticeEarly')} />
      </Section>

      {/* 4. Stoic Control Check */}
      <Section title="4. Stoic Control Check">
        <p className="text-sm text-stone-500 mb-4 italic">“Some things are in our control and others not.” — Epictetus</p>
        {formData.controlCheck.situations.map((sit, idx) => (
          <div key={idx} className="mb-6 p-4 bg-stone-50 rounded-lg border border-stone-100">
            <TextArea 
              label="Situation that disturbed me" 
              value={sit.text} 
              onChange={(v) => {
                const newSits = [...formData.controlCheck.situations];
                newSits[idx].text = v;
                handleText('controlCheck', 'situations', newSits);
              }} 
            />
            <div className="flex gap-8 mb-4">
              <div>
                <span className="block text-xs font-bold uppercase text-stone-400 mb-2">Within my control?</span>
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      const newSits = [...formData.controlCheck.situations];
                      newSits[idx].withinControl = true;
                      handleText('controlCheck', 'situations', newSits);
                    }}
                    className={`px-4 py-1 rounded text-sm ${sit.withinControl === true ? 'bg-stone-800 text-white' : 'bg-white border border-stone-200'}`}
                  >Yes</button>
                  <button 
                    onClick={() => {
                      const newSits = [...formData.controlCheck.situations];
                      newSits[idx].withinControl = false;
                      handleText('controlCheck', 'situations', newSits);
                    }}
                    className={`px-4 py-1 rounded text-sm ${sit.withinControl === false ? 'bg-stone-800 text-white' : 'bg-white border border-stone-200'}`}
                  >No</button>
                </div>
              </div>
              <div>
                <span className="block text-xs font-bold uppercase text-stone-400 mb-2">Acted as if it was?</span>
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      const newSits = [...formData.controlCheck.situations];
                      newSits[idx].actedAsIf = true;
                      handleText('controlCheck', 'situations', newSits);
                    }}
                    className={`px-4 py-1 rounded text-sm ${sit.actedAsIf === true ? 'bg-stone-800 text-white' : 'bg-white border border-stone-200'}`}
                  >Yes</button>
                  <button 
                    onClick={() => {
                      const newSits = [...formData.controlCheck.situations];
                      newSits[idx].actedAsIf = false;
                      handleText('controlCheck', 'situations', newSits);
                    }}
                    className={`px-4 py-1 rounded text-sm ${sit.actedAsIf === false ? 'bg-stone-800 text-white' : 'bg-white border border-stone-200'}`}
                  >No</button>
                </div>
              </div>
            </div>
            <TextArea 
              label="What was within my control that I neglected?" 
              value={sit.neglected} 
              onChange={(v) => {
                const newSits = [...formData.controlCheck.situations];
                newSits[idx].neglected = v;
                handleText('controlCheck', 'situations', newSits);
              }} 
            />
          </div>
        ))}
      </Section>

      {/* 5. Speech & Action Review */}
      <Section title="5. Speech & Action Review" quote="Where you stumble, there lies your task. — Seneca">
        <Checkbox label="Speak when silence was wiser?" checked={formData.speechAction.actions.speakSilence} onChange={() => handleCheckbox('speechAction', 'actions', 'speakSilence')} />
        <Checkbox label="Remain silent when honesty was required?" checked={formData.speechAction.actions.silentHonesty} onChange={() => handleCheckbox('speechAction', 'actions', 'silentHonesty')} />
        <Checkbox label="Act from impulse rather than reason?" checked={formData.speechAction.actions.impulse} onChange={() => handleCheckbox('speechAction', 'actions', 'impulse')} />
        <Checkbox label="Avoid necessary discomfort?" checked={formData.speechAction.actions.avoidDiscomfort} onChange={() => handleCheckbox('speechAction', 'actions', 'avoidDiscomfort')} />
        <div className="mt-6">
          <TextArea label="Choose one moment (What happened?)" value={formData.speechAction.reflection.moment} onChange={(v) => handleText('speechAction', 'reflection', v, 'moment')} />
          <TextArea label="What was the better response?" value={formData.speechAction.reflection.betterResponse} onChange={(v) => handleText('speechAction', 'reflection', v, 'betterResponse')} />
          <TextArea label="What cue should I notice next time?" value={formData.speechAction.reflection.cue} onChange={(v) => handleText('speechAction', 'reflection', v, 'cue')} />
        </div>
      </Section>

      {/* 6. Self & Ego Check */}
      <Section title="6. Self & Ego Check">
        <TextArea label="Where did self-image drive my behavior?" value={formData.selfEgo.behavior} onChange={(v) => handleText('selfEgo', 'behavior', v)} />
        <TextArea label="Where did I seek validation?" value={formData.selfEgo.validation} onChange={(v) => handleText('selfEgo', 'validation', v)} />
        <TextArea label="Where did self-concern reduce presence?" value={formData.selfEgo.compassion} onChange={(v) => handleText('selfEgo', 'compassion', v)} />
        <TextArea label="Did self-focus improve or degrade the situation?" value={formData.selfEgo.improved} onChange={(v) => handleText('selfEgo', 'improved', v)} />
      </Section>

      {/* 7. Gratitude & Mortality */}
      <Section title="7. Gratitude & Mortality">
        <TextArea label="One thing I took for granted this week" value={formData.gratitudeMortality.takenForGranted} onChange={(v) => handleText('gratitudeMortality', 'takenForGranted', v)} />
        <TextArea label="One ordinary moment worth repeating" value={formData.gratitudeMortality.ordinaryMoment} onChange={(v) => handleText('gratitudeMortality', 'ordinaryMoment', v)} />
        <TextArea label="If this week were repeated for the last time, what would I do differently?" value={formData.gratitudeMortality.different} onChange={(v) => handleText('gratitudeMortality', 'different', v)} />
        <TextArea label="What would I stop postponing?" value={formData.gratitudeMortality.stopPostponing} onChange={(v) => handleText('gratitudeMortality', 'stopPostponing', v)} />
      </Section>

      {/* 8. One Correction */}
      <Section title="8. One Correction for Next Week">
        <div className="bg-stone-800 text-white p-6 rounded-lg">
          <p className="text-stone-400 text-sm mb-4 uppercase tracking-widest font-sans">Behavioral & Concrete</p>
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-xl italic font-serif">Next week, when</span>
              <input 
                type="text" 
                placeholder="irritation arises"
                value={formData.correction.trigger}
                onChange={(e) => handleText('correction', 'trigger', e.target.value)}
                className="bg-transparent border-b border-stone-600 focus:border-white focus:outline-none px-1 text-xl italic font-serif flex-grow min-w-[200px]"
              />
              <span className="text-xl italic font-serif">occurs,</span>
            </div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-xl italic font-serif">I will</span>
              <input 
                type="text" 
                placeholder="pause before replying"
                value={formData.correction.action}
                onChange={(e) => handleText('correction', 'action', e.target.value)}
                className="bg-transparent border-b border-stone-600 focus:border-white focus:outline-none px-1 text-xl italic font-serif flex-grow min-w-[200px]"
              />
              <span className="text-xl italic font-serif">.</span>
            </div>
          </div>
        </div>
      </Section>

      {/* 9. Closing Reset */}
      <Section title="9. Closing Reset">
        <Checkbox label="Take one breath" checked={formData.closing.breath} onChange={() => handleCheckbox('closing', 'breath')} />
        <Checkbox label="Drop the review" checked={formData.closing.drop} onChange={() => handleCheckbox('closing', 'drop')} />
        <Checkbox label="Begin the next week without self-judgment" checked={formData.closing.begin} onChange={() => handleCheckbox('closing', 'begin')} />
      </Section>

      <div className="flex justify-center pb-20">
        <button 
          onClick={saveReview}
          className="flex items-center gap-2 bg-stone-800 text-white px-12 py-4 rounded-md hover:bg-stone-700 transition-colors shadow-xl text-lg font-sans font-bold uppercase tracking-widest"
        >
          <Save size={20} /> Complete Reflection
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
