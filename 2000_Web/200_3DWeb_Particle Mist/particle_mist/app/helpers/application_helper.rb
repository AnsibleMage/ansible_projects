module ApplicationHelper
  def default_meta_tags
    {
      site: 'Ansible Particle Mist',
      title: 'The Mist Manifesto',
      reverse: true,
      separator: '|',
      description: 'A lightweight, dynamic particle system honoring the philosophy of Ansible Mist.',
      keywords: 'particle, canvas, rails 8, stimulus, ansible, mist',
      canonical: request.original_url,
      noindex: !Rails.env.production?,
      icon: [
        { href: image_url('icon.png'), type: 'image/png' },
        { href: image_url('icon.svg'), type: 'image/svg+xml' }
      ],
      og: {
        site_name: 'Ansible Particle Mist',
        title: 'The Mist Manifesto',
        description: 'Living particles on the web.',
        type: 'website',
        url: request.original_url,
        image: image_url('og-image.png')
      },
      twitter: {
        card: 'summary_large_image',
        site: '@AnsibleMage',
        title: 'Ansible Particle Mist',
        description: 'Living particles on the web.',
        image: image_url('og-image.png')
      }
    }
  end
end
